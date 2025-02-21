import {type User, clerkClient} from "@clerk/nextjs/server";
import {TRPCError} from "@trpc/server";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import {z} from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(3, "60 s"),
});

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ctx}) => {
    const posts = await ctx.db.post.findMany({
      orderBy: {createdAt: "desc"},
      take: 100,
    });

    const clerk = await clerkClient();
    const {data} = await clerk.users.getUserList({
      userId: posts.map(post => post.authorId),
      limit: 100,
    });
    const users = data.map(filterUserForClient);

    return posts.map(post => ({
      data: post,
      author: users.find(user => user.id === post.authorId)!,
    }));
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().emoji("Only emojis are allowed").min(1).max(180),
      })
    )
    .mutation(async ({ctx, input}) => {
      const authorId = ctx.auth.userId;

      const {success} = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({code: "TOO_MANY_REQUESTS"});

      return ctx.db.post.create({
        data: {
          content: input.content,
          authorId,
        },
      });
    }),
});

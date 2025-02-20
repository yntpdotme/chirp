import {type User, clerkClient} from "@clerk/nextjs/server";
import {z} from "zod/v4";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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
        content: z.emoji().min(1).max(180),
      })
    )
    .mutation(async ({ctx, input}) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          authorId: ctx.auth.userId,
        },
      });
    }),
});

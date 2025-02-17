import {type User, clerkClient} from "@clerk/nextjs/server";
import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

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

  create: publicProcedure
    .input(z.object({content: z.string().min(1), userId: z.string()}))
    .mutation(async ({ctx, input}) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          authorId: input.userId,
        },
      });
    }),
});

import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ctx}) => {
    return ctx.db.post.findMany({
      orderBy: {createdAt: "desc"},
    });
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

  getLatest: publicProcedure.query(async ({ctx}) => {
    try {
      const post = await ctx.db.post.findFirst({
        orderBy: {createdAt: "desc"},
      });

      return post ?? null;
    } catch (error) {
      console.error("Error fetching latest post:", error);
      return null;
    }
  }),
});

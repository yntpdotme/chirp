import {clerkClient} from "@clerk/nextjs/server";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {filterUserForClient} from "@/server/helpers/filter-user-for-clients";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({username: z.string()}))
    .query(async ({input}) => {
      const client = await clerkClient();
      const {data: users} = await client.users.getUserList({
        username: [input.username],
      });
      if (!users[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return filterUserForClient(users[0]);
    }),
});

import { Context } from "elysia";

import { prisma } from "@/database";

import { createSuccessMessage } from "@/helpers/response";

export default async (context: Context) => {
  const users = await prisma.user.findMany();

  const successMessage = createSuccessMessage({
    result: users,
  });

  return context.status(200, successMessage);
};

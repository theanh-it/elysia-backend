import { Context } from "elysia";

import { createSuccessMessage } from "@/helpers/response";

import type { BodyJWT } from "@/types";

export default async (context: Context & { user: BodyJWT }) => {
  const user = context.user;

  return createSuccessMessage({
    message: "Profile fetched successfully",
    result: user,
  });
};

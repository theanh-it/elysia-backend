import { Context } from "elysia";

import { createErrorMessage } from "@/helpers/response";
import { verifyToken } from "@/helpers/auth";

import { BodyJWT } from "@/types";

export default async (context: Context) => {
  try {
    const token = getToken(context);

    if (!token) {
      const errorMessage = createErrorMessage({
        message: "Required token",
        result: {
          token: "Required token",
        },
      });

      return context.status(401, errorMessage);
    }

    const decoded = await verifyToken(token);
    const user = decoded as BodyJWT;

    Object.assign(context, { user });
  } catch (error) {
    const errorMessage = createErrorMessage({
      message: "Invalid token",
      result: {
        token: "Invalid token",
      },
    });

    return context.status(401, errorMessage);
  }
};

const getToken = (context: Context) => {
  const token = context.request.headers.get("authorization") || "";
  const [_, tokenValue] = token.split(" ");

  return tokenValue || "";
};

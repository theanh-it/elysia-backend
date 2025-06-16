import { Context } from "elysia";
import { z } from "zod";

import { compareSync } from "@/helpers/password";
import { validateData } from "@/helpers/request";
import { createErrorMessage, createSuccessMessage } from "@/helpers/response";
import { signJWT } from "@/helpers/auth";
import { prisma } from "@/database";

import type { BodyJWT } from "@/types";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  remember: z.boolean().optional(),
});

type LoginBody = z.infer<typeof loginSchema>;

export default async (context: Context) => {
  const body = context.body as LoginBody;

  const resultValidate = await validateData(body, loginSchema);

  if (!resultValidate.success) {
    const errorMessage = createErrorMessage({
      result: resultValidate.errors,
      message: "Validation error",
    });

    return context.status(422, errorMessage);
  }

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    const errorMessage = createErrorMessage({
      message: "Username not found",
      result: {
        username: "Username not found",
      },
    });

    return context.status(422, errorMessage);
  }

  const isPasswordValid = compareSync(body.password, user.password);

  if (!isPasswordValid) {
    const errorMessage = createErrorMessage({
      message: "Password not match",
      result: {
        password: "Password not match",
      },
    });

    return context.status(422, errorMessage);
  }

  const remember = body.remember || false;
  const bodyJWT: BodyJWT = {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
  };

  const token = await signJWT(bodyJWT, remember);

  const successMessage = createSuccessMessage({
    message: "Login success",
    result: {
      token,
      user: bodyJWT,
    },
  });

  return context.status(200, successMessage);
};

import { Context } from "elysia";

import { uploadImage } from "@/helpers/file";

import { createSuccessMessage, createErrorMessage } from "@/helpers/response";

type BodyType = {
  image: File;
};

export default async ({ body, status }: Context) => {
  const image = body as BodyType;

  const result = await uploadImage(image.image);

  if (!result.success) {
    const errorMessage = createErrorMessage({
      message: result.message,
    });

    return status(422, errorMessage);
  }

  const successMessage = createSuccessMessage({
    result: {
      link: result.link,
      name: result.name,
    },
    message: result.message,
  });

  return status(200, successMessage);
};

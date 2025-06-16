import { Context } from "elysia";

import { getFilesFromBody } from "@/helpers/request";
import { createSuccessMessage } from "@/helpers/response";
import { uploadImage } from "@/helpers/file";

type BodyType = {
  [name: string]: any;
  images: File | File[];
};

export default async (context: Context) => {
  const body = context.body as BodyType;
  const files = getFilesFromBody(body, "images");

  for (const file of files) {
    await uploadImage(file);
  }

  const successMessage = createSuccessMessage({
    message: "Upload images success",
  });

  return context.status(200, successMessage);
};

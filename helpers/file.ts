import fs from "fs";
import { uid } from "uid";
import sharp from "sharp";

import { IMAGE_WIDTH } from "@/constants";

export const getLinkImage = (name: string) => {
  return `${process.env.APP_URL}/images/${name}`;
};

export const getImagePath = (name?: string) => {
  if (!fs.existsSync("./files")) {
    fs.mkdirSync("./files");
  }

  const folder = `./files/images`;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  if (name) {
    return `${folder}/${name}`;
  }

  const id = uid(32);

  return `${folder}/${id}`;
};

export const removeImage = (name: string) => {
  if (!name) {
    return false;
  }

  const path = getImagePath(name);

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  return true;
};

type UploadImageResult = {
  success: boolean;
  message: string;
  error: any;
  link: string | null;
  name: string | null;
};

export const uploadImage = async (image: File): Promise<UploadImageResult> => {
  const path = getImagePath(image.name);

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    fs.writeFile(path, buffer, (error) => {
      if (error) {
        return resolve({
          success: false,
          message: "Failed to upload image",
          error,
          link: null,
          name: null,
        });
      }

      resolve({
        success: true,
        message: "Image uploaded successfully",
        error: null,
        link: getLinkImage(image.name),
        name: image.name,
      });
    });
  });
};

export type UploadImageSharpOptions = {
  width?: number;
  path?: string;
};

export const uploadImageWithSharp = async (
  image: File,
  options: UploadImageSharpOptions
): Promise<UploadImageResult> => {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const info = await sharp(buffer).metadata();
    const width = info.width as number;

    const path = options.path || getImagePath(image.name);

    if (width > IMAGE_WIDTH) {
      await sharp(buffer).resize({ width: IMAGE_WIDTH }).webp().toFile(path);
    } else {
      await sharp(buffer).toFile(path);
    }

    const fileName = path.split("/").pop();

    return {
      success: true,
      message: "Image uploaded successfully",
      error: null,
      link: getLinkImage(fileName!),
      name: fileName!,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to upload image",
      error,
      link: null,
      name: null,
    };
  }
};

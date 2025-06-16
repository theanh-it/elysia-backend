export const validateData = async (data: object = {}, schema: any) => {
  try {
    await schema.parseAsync(data);

    return { success: true };
  } catch (error: any) {
    const errors = error.errors.reduce(
      (result: any, { path = [], message = "" }) => {
        const [key] = path;

        result[key] = message;

        return result;
      },
      {}
    );

    return {
      success: false,
      errors,
    };
  }
};

export const getFilesFromBody = (
  body: { [name: string]: any },
  name: string
) => {
  const isMultipleFile = Array.isArray(body[name]);

  let files: File[] = [];

  if (isMultipleFile) {
    files = body[name] as File[];
  } else {
    files = [body[name] as File];
  }

  return files;
};

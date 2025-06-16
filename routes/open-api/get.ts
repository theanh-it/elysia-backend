import { Context } from "elysia";

export default (context: Context) => {
  console.log(context.path);

  return "get open-api";
};

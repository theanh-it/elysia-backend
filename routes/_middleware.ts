import { Context } from "elysia";

export default [
  (context: Context) => {
    console.log("global middleware");
  },
];

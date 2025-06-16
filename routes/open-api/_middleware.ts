import { Context } from "elysia";

export default [
  (context: Context) => {
    console.log("beforeHandle open-api 1");
  },
  (context: Context) => {
    console.log("beforeHandle open-api 2");
  },
  (context: Context) => {
    console.log("beforeHandle open-api 3");
  },
];

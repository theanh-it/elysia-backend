import "dotenv/config";
import "module-alias/register";
import os from "os";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { nnnRouterPlugin } from "elysia-nnn-router";

const app = new Elysia();
const port = process.env.PORT || 3000;
const configStatic = {
  assets: "files",
  prefix: "/",
};

app.use(cors());
app.use(staticPlugin(configStatic));
app.use(nnnRouterPlugin());
app.get("/", () => ({
  status: "success",
  message: "Welcome to the elysia api",
}));

const size = os.cpus().length as unknown as string;
process.env.UV_THREADPOOL_SIZE = size;

app.listen(port, () => {
  console.log(`🦊 Elysia server running at http://localhost:${port}`);
  console.log(`🦊 THREADPOOL SIZE: ${size}`);
});

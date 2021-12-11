import { http, data } from "@serverless/cloud";
import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

// Create GET route and return users
router.get("/users", async (ctx) => {
  // Get users from Serverless Data
  let result = await data.get("user:*", true);
  // Return the results
  ctx.body = {
    users: result.items,
  };
});

// Redirect to users endpoint
router.get("/(.*)", (ctx) => {
  ctx.redirect("/users");
});

app.use(router.routes()).use(router.allowedMethods());

http.use(app);

export default app; // for tests to be able to import the koa app

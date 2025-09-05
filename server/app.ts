import { Hono } from "hono";
import { healthcheckHandler } from "./routes/healthcheck";
import { authenticationHandler } from "./routes/authentication";
import { todosHandler } from "./routes/todos";

function createApp() {
  const app = new Hono().basePath("/api");

  const routes = [healthcheckHandler, authenticationHandler, todosHandler] as const;

  routes.forEach((route) => app.route("/", route));

  return app;
}

const app = createApp();

export default app;

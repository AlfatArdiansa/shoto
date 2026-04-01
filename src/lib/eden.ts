import { treaty } from "@elysiajs/eden";
import { apiRoutes } from "@/modules/v1/route";
import { env } from "./env";

// .api to enter /api prefix
export const api =
  // process is defined on server side and build time
  typeof process !== "undefined"
    ? treaty<typeof apiRoutes>(new URL(env.BASE_URL).host).api
    : treaty<typeof apiRoutes>("localhost:3000").api;

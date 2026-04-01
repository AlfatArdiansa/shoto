import { treaty } from "@elysiajs/eden";
import { apiRoutes } from "@/modules/v1/route";

// .api to enter /api prefix
export const api =
  // process is defined on server side and build time
  typeof process !== "undefined"
    ? treaty<typeof apiRoutes>("localhost:3000").api
    : treaty<typeof apiRoutes>("localhost:3000").api;

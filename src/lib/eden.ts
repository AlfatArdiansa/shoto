import { treaty } from "@elysiajs/eden";
import { apiRoutes } from "@/app/api/[[...slugs]]/route";
import { getBaseURL } from "@/action/env";

// .api to enter /api prefix
export const api =
  // process is defined on server side and build time
  typeof process !== "undefined"
    ? treaty(apiRoutes).api
    : treaty<typeof apiRoutes>(new URL(await getBaseURL()).host).api;

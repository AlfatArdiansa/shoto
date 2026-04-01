import { apiV1Routes } from "@/modules/v1/route";
import Elysia from "elysia";

export const apiRoutes = new Elysia({ prefix: "/api" }).use(apiV1Routes);

export const GET = apiRoutes.fetch,
  POST = apiRoutes.fetch,
  PUT = apiRoutes.fetch,
  PATCH = apiRoutes.fetch,
  DELETE = apiRoutes.fetch,
  HEAD = apiRoutes.fetch,
  OPTION = apiRoutes.fetch;

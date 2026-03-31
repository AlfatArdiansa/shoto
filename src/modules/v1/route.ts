import Elysia from "elysia";
import { linkRoutes } from "./link/route";

export const apiV1Routes = new Elysia({ prefix: "/v1" }).use(linkRoutes);

export const apiRoutes = new Elysia({ prefix: "/api" }).use(apiV1Routes);

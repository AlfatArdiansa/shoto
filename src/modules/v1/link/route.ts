import Elysia, { t } from "elysia";
import { addLink, generateSlug, getLink } from "./service";
import { APIError, APIResponse } from "@/lib/http-helper";

const linkRoutes = new Elysia({ prefix: "/link" })
  .get(
    "/",
    async ({ query }) => {
      const linkData = await getLink(query.slug);

      if (!linkData) throw new Error("Link not found");

      return linkData;
    },
    {
      query: t.Object({
        slug: t.String(),
      }),
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const slug = await generateSlug();
      await addLink(slug, body.url);

      return { slug };
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    },
  );

export { linkRoutes };

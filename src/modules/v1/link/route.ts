import Elysia, { t } from "elysia";
import { addLink, generateSlug, getLink } from "./service";

const linkRoutes = new Elysia({ prefix: "/link" })
  .get(
    "/",
    async ({ query }) => {
      const linkData = await getLink(query.slug);

      if (linkData)
        return new Response(null, {
          status: 301,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Location: linkData.url,
          },
        });
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
      const slug = generateSlug();
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

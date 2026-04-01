import Elysia, { status, t } from "elysia";
import { addLink, generateSlug, getLink, getUrl } from "./service";
import { env } from "@/lib/env";
import { getBaseURL } from "@/action/env";

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
      const { url } = body;

      const urlExists = await getUrl(url);

      if (urlExists) {
        return status(200, {
          slug: urlExists.slug,
          shortUrl: `${await getBaseURL()}/${urlExists.slug}`,
          url,
        });
      }

      const slug = await generateSlug();
      await addLink(slug, body.url);

      return status(201, {
        slug,
        shortUrl: `${await getBaseURL()}/${slug}`,
        url: body.url,
      });
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    },
  );

export { linkRoutes };

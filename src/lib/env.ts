export const dynamic = "force-dynamic";

import z from "zod";

const envSchema = z.object({
  BASE_URL: z
    .string()
    .default("https://example.com")
    .transform((url) => (url.endsWith("/") ? url.slice(0, -1) : url)),
  TITLE: z.string().default("Alfat's Link Shortener"),
});

export const env = envSchema.parse(process.env);

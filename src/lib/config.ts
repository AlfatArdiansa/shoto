import { existsSync, readFileSync } from "node:fs";
import z from "zod";

const configSchema = z.object({
  BASE_URL: z.string().default("https://example.com"),
  TITLE: z.string().default("Alfat's Link Shortener"),
});

export type Config = z.infer<typeof configSchema>;

export const getConfig = async (): Promise<Config> => {
  const configPath = "./data/config.json";

  if (!existsSync(configPath)) {
    return configSchema.parse({});
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    return configSchema.parse(JSON.parse(content));
  } catch (error) {
    console.error("Error reading config file, using defaults", error);
    return configSchema.parse({});
  }
};

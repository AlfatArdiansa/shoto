import { existsSync, mkdirSync } from "node:fs";
import { DatabaseHelper } from "./helper/database";
import { EnvHelper } from "./helper/env";
import { env } from "./lib/env";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (!existsSync("./data")) mkdirSync("./data");
    await EnvHelper.createEnvFile();
    await DatabaseHelper.initiateDatabase();
    console.log("ENV", env);
  }
}

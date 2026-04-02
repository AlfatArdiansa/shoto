import { ConfigHelper } from "./helper/config";
import { DatabaseHelper } from "./helper/database";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { existsSync, mkdirSync } = await import("node:fs");

    if (!existsSync("./data")) {
      mkdirSync("./data");
    }
    await ConfigHelper.createConfigFile();
    await DatabaseHelper.initiateDatabase();
  }
}

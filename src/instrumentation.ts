import { DatabaseHelper } from "./helper/database";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await DatabaseHelper.initiateDatabase();
  }
}

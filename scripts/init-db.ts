import { DatabaseHelper } from "../src/helper/database";

await DatabaseHelper.initiateDatabase();
console.log("Database initialized");

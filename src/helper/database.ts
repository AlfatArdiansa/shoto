import { db } from "../lib/database";

export class DatabaseHelper {
  static initiateDatabase = async () => {
    db.run(`CREATE TABLE IF NOT EXISTS link (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  };
}

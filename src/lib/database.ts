import "server-only";

import { Database } from "bun:sqlite";

let db: Database | null = null;

export const getDB = () => {
  if (!db) {
    db = new Database("./data/link.db", { create: true });
  }
  return db;
};

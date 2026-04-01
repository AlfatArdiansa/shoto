import "server-only";

import { Database } from "bun:sqlite";

export const db = new Database("link.db", { create: true });

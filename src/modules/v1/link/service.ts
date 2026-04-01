"use server";

import { db } from "@/lib/database";

export const generateSlug = async (length: number = 6) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
};

export const addLink = async (slug: string, url: string) => {
  const stmt = db.query("INSERT INTO link (slug, url) VALUES (?, ?)");

  return stmt.run(slug, url);
};

export const getLink = async (slug: string) => {
  const stmt = db.query("SELECT id, slug, url FROM link WHERE slug = ?");
  return stmt.get(slug) as {
    id: number;
    slug: string;
    url: string;
    created_at: string;
  } | null;
};

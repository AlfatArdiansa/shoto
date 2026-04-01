"use server";

import "server-only";
import { getDB } from "@/lib/database";

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
  const stmt = getDB().query("INSERT INTO link (slug, url) VALUES (?, ?)");

  return stmt.run(slug, url);
};

export const getUrl = async (url: string) => {
  const stmt = getDB().query("SELECT id, slug, url FROM link WHERE url = ?");
  return stmt.get(url) as { id: number; slug: string; url: string } | null;
};

export const getLink = async (slug: string) => {
  const stmt = getDB().query("SELECT id, slug, url FROM link WHERE slug = ?");
  return stmt.get(slug) as {
    id: number;
    slug: string;
    url: string;
  } | null;
};

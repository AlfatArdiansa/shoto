"use server";

import { env } from "@/lib/env";

export const getTitle = async () => {
  return env.TITLE;
};

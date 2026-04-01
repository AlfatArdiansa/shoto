"use server";

import { env } from "@/lib/env";

export const getBaseURL = async () => {
  return env.BASE_URL;
};

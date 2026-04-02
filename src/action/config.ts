"use server";

import { unstable_noStore as noStore } from "next/cache";
import { getConfig } from "@/lib/config";

export const getTitle = async () => {
  noStore();
  return (await getConfig()).TITLE;
};

export const getBaseURL = async () => {
  noStore();
  return (await getConfig()).BASE_URL;
};

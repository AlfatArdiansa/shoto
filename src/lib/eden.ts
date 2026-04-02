import { treaty } from "@elysiajs/eden";
import { apiRoutes } from "@/app/api/[[...slugs]]/route";

// .api to enter /api prefix
export const initiateAPI = (url: string) => treaty<typeof apiRoutes>(url).api;

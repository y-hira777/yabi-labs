import type { MicroCMSDate } from "./microcms";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
} & MicroCMSDate;

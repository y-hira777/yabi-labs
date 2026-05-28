import type { MicroCMSDate } from "./microcms";

export type Tag = {
  id: string;
  name: string;
  slug: string;
} & MicroCMSDate;

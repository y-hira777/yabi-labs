import type { MicroCMSDate, MicroCMSImage } from "./microcms";
import type { Category } from "./category";
import type { Tag } from "./tag";

export type ArticleStatus = "draft" | "review" | "published";

export type Article = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  thumbnail?: MicroCMSImage;
  categories?: Category[];
  tags?: Tag[];
  published_at?: string;
} & MicroCMSDate;

import type { MicroCMSDate, MicroCMSImage } from "./microcms";
import type { Category } from "./category";
import type { Tag } from "./tag";

export type ArticleStatus = "draft" | "review" | "published";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
  tags?: Tag[];
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: MicroCMSImage;
  isFeatured?: boolean;
  status?: ArticleStatus;
} & MicroCMSDate;

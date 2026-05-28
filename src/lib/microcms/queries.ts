import { client } from "./client";
import type { Article } from "@/types/article";
import type { Category } from "@/types/category";
import type { Tag } from "@/types/tag";
import type { MicroCMSListResponse } from "@/types/microcms";

const ARTICLE_FIELDS =
  "id,title,slug,thumbnail,content,categories,tags,published_at";

// -------------------------------------------------------
// Articles
// -------------------------------------------------------

export async function getArticles(params?: {
  limit?: number;
  offset?: number;
  fields?: string;
  filters?: string;
}): Promise<MicroCMSListResponse<Article>> {
  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit: params?.limit ?? 12,
      offset: params?.offset ?? 0,
      fields: params?.fields ?? ARTICLE_FIELDS,
      filters: params?.filters,
      orders: "-published_at",
    },
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return res.contents[0] ?? null;
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: "isFeatured[equals]true",
      limit,
      fields: ARTICLE_FIELDS,
      orders: "-published_at",
    },
  });
  return res.contents;
}

export async function getArticlesByCategory(
  categoryId: string,
  params?: { limit?: number; offset?: number }
): Promise<MicroCMSListResponse<Article>> {
  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `categories[contains]${categoryId}`,
      limit: params?.limit ?? 12,
      offset: params?.offset ?? 0,
      fields: ARTICLE_FIELDS,
      orders: "-published_at",
    },
  });
}

export async function getArticlesByTag(
  tagId: string,
  params?: { limit?: number; offset?: number }
): Promise<MicroCMSListResponse<Article>> {
  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `tags[contains]${tagId}`,
      limit: params?.limit ?? 12,
      offset: params?.offset ?? 0,
      fields: ARTICLE_FIELDS,
      orders: "-published_at",
    },
  });
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { fields: "slug", limit: 1000 },
  });
  return res.contents.map((a) => a.slug);
}

// -------------------------------------------------------
// Categories
// -------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const res = await client.getList<Category>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
  return res.contents;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await client.getList<Category>({
    endpoint: "categories",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return res.contents[0] ?? null;
}

// -------------------------------------------------------
// Tags
// -------------------------------------------------------

export async function getTags(): Promise<Tag[]> {
  const res = await client.getList<Tag>({
    endpoint: "tags",
    queries: { limit: 200 },
  });
  return res.contents;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const res = await client.getList<Tag>({
    endpoint: "tags",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return res.contents[0] ?? null;
}

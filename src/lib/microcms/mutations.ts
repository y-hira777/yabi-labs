// サーバー専用モジュール。Client Component (`"use client"`) から import しないこと。
// 書き込みAPIキーを扱うため、Server Component / Server Action / CLI からのみ呼び出す。
import { createClient } from "microcms-js-sdk";
import type { Article } from "@/types/article";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is not defined");
}
if (!process.env.MICROCMS_WRITE_API_KEY) {
  throw new Error("MICROCMS_WRITE_API_KEY is not defined");
}

const writeClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_WRITE_API_KEY,
});

export type ArticleDraftInput = Omit<
  Article,
  "id" | "createdAt" | "updatedAt" | "revisedAt" | "categories" | "tags"
> & {
  categories?: string[];
  tags?: string[];
};

// -------------------------------------------------------
// Articles
// -------------------------------------------------------

// microCMS のネイティブな下書き状態(status=draft)で作成するため、
// 公開サイトの一覧取得(queries.ts)は変更せずとも下書きは表示されない。
export async function createArticleDraft(input: ArticleDraftInput): Promise<string> {
  const res = await writeClient.create({
    endpoint: "articles",
    content: input,
    isDraft: true,
  });
  return res.id;
}

export async function publishArticle(id: string): Promise<void> {
  await writeClient.update({
    endpoint: "articles",
    contentId: id,
    content: {},
  });
}

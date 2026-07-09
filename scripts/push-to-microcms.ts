import { readFileSync } from "node:fs";
import { createArticleDraft, type ArticleDraftInput } from "../src/lib/microcms/mutations";

// n8n / Cowork からは標準入力に記事フィールドの JSON を渡して呼び出す想定。
// 例: echo '{"title":"...","slug":"...","content":"..."}' | npm run push:microcms
// ローカル確認用に --input <file> でファイルからも読み込める。
function readInput(): string {
  const flagIndex = process.argv.findIndex((arg) => arg === "--input" || arg === "-i");
  if (flagIndex !== -1) {
    const filePath = process.argv[flagIndex + 1];
    if (!filePath) {
      throw new Error("--input にはファイルパスを指定してください");
    }
    return readFileSync(filePath, "utf-8");
  }
  return readFileSync(0, "utf-8");
}

async function main() {
  const input = JSON.parse(readInput()) as ArticleDraftInput;

  if (!input.title || !input.slug) {
    throw new Error("title と slug は必須です");
  }

  const id = await createArticleDraft(input);
  process.stdout.write(`${id}\n`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});

# AI自動投稿 設計メモ

n8n / OpenAI / Claude API を使った記事自動投稿の設計メモです。  
現時点では未実装ですが、将来的に拡張できるよう構成を整理しておきます。

---

## 将来的に実現したいフロー

```
【AI記事自動生成フロー】

情報収集（RSS / X / はてブ 等）
  → n8n でスクレイピング・収集
  → OpenAI / Claude API で下書き生成
  → microCMS API で下書き投稿（status: draft）
  → Yabi が管理画面で確認・編集
  → 「公開」ボタンを押す
  → microCMS Webhook → Netlify 再ビルド
  → https://yabi-labs.jp に反映

【X 投稿自動生成フロー】
記事公開
  → n8n が microCMS Webhook を受信
  → Claude API で X 投稿文を生成
  → X API で投稿（または Slack / LINE で確認してから投稿）

【Qiita / Zenn 変換フロー】
記事本文（microCMS リッチエディタ）
  → n8n で取得
  → Claude API でマークダウン変換・最適化
  → Qiita API / Zenn GitHub リポジトリへ投稿
```

---

## 技術スタック（想定）

| 役割 | ツール |
|------|--------|
| ワークフロー自動化 | n8n（セルフホスト or n8n Cloud） |
| AI テキスト生成 | OpenAI API (GPT-4o) / Anthropic API (Claude) |
| CMS 操作 | microCMS REST API |
| SNS 投稿 | X (Twitter) API v2 |
| 通知・確認 | Slack API / LINE Notify |

---

## microCMS API エンドポイント

n8n から microCMS へ操作する際のエンドポイントです。

### 記事一覧取得

```
GET https://{MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles
Headers:
  X-MICROCMS-API-KEY: {MICROCMS_API_KEY}
```

### 記事 1 件取得（slug 指定）

```
GET https://{MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles?filters=slug[equals]{slug}
Headers:
  X-MICROCMS-API-KEY: {MICROCMS_API_KEY}
```

### 記事の下書き投稿（新規作成）

```
POST https://{MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles
Headers:
  X-MICROCMS-API-KEY: {MICROCMS_API_KEY}
  Content-Type: application/json

Body:
{
  "title": "記事タイトル",
  "slug": "article-slug",
  "excerpt": "記事の概要",
  "body": "<p>本文HTML</p>",
  "status": "draft"
}
```

> **注意**: `MICROCMS_API_KEY` には書き込み権限が必要です。  
> microCMS 管理画面 > API設定 で「コンテンツの作成・更新」権限を付与したキーを使用してください。  
> 読み取り専用キーとは別に管理することを推奨します。

### 記事の更新

```
PATCH https://{MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/{id}
Headers:
  X-MICROCMS-API-KEY: {MICROCMS_API_KEY}
  Content-Type: application/json

Body:
{
  "status": "published"
}
```

---

## 環境変数の追加（将来的に必要になるもの）

`.env.example` に追加予定の変数：

```env
# AI API（将来的に追加）
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# microCMS 書き込み用 API キー（読み取りとは分ける）
MICROCMS_WRITE_API_KEY=your-write-api-key

# Netlify Build Hook（n8n からの手動再ビルドトリガー用）
NETLIFY_BUILD_HOOK_URL=https://api.netlify.com/build_hooks/xxx

# SNS（将来的に追加）
X_API_KEY=your-x-api-key
X_API_SECRET=your-x-api-secret
X_ACCESS_TOKEN=your-x-access-token
X_ACCESS_TOKEN_SECRET=your-x-access-token-secret
```

> これらは Netlify の環境変数にも設定し、コードには書かないこと。  
> n8n がセルフホストの場合は n8n 側の Credentials に設定する。

---

## n8n ワークフロー設計メモ

### ワークフロー 1: AI 記事下書き生成

```
[Trigger: 手動 / Schedule]
  → HTTP Request: RSS フィードや Web スクレイピングで情報収集
  → Set: データ整形
  → OpenAI / Anthropic: 記事本文・タイトル・excerpt を生成
  → HTTP Request (POST): microCMS に下書き投稿
  → Slack / LINE: 「下書き生成完了」通知
```

### ワークフロー 2: X 投稿文生成

```
[Trigger: microCMS Webhook（公開時）]
  → HTTP Request: microCMS から記事本文を取得
  → Anthropic: X 投稿文を生成（280字以内）
  → [分岐] 自動投稿 or 確認後投稿
    → 自動: Twitter API で投稿
    → 確認: Slack に投稿文を送信して承認待ち
```

### ワークフロー 3: Qiita / Zenn 変換

```
[Trigger: 手動（記事 ID を指定）]
  → HTTP Request: microCMS から記事取得
  → Anthropic: HTML → マークダウン変換・Qiita / Zenn 向け最適化
  → [分岐]
    → Qiita: Qiita API で投稿
    → Zenn: GitHub リポジトリに markdown ファイルを push
```

---

## 拡張しやすい現在のコード構成

現在の `src/lib/microcms/queries.ts` は薄いクエリ関数として分離されています。  
n8n や外部スクリプトから呼び出す場合は、このファイルのロジックを参考に  
直接 microCMS API を叩く形で実装できます。

```typescript
// 参考: src/lib/microcms/queries.ts の構成
export async function getArticles(params) { ... }
export async function getArticleBySlug(slug) { ... }
export async function getCategories() { ... }
// ...
```

将来的に管理系 API（投稿・更新）を追加する場合は  
`src/lib/microcms/mutations.ts` として分離することを推奨します。

---

## 今後の実装優先順位（参考）

1. microCMS 実接続とコンテンツ投入
2. Netlify Build Hook 動作確認
3. n8n セットアップ（ローカル Docker または n8n Cloud）
4. AI 記事下書き生成ワークフロー
5. X 投稿文生成ワークフロー
6. Qiita / Zenn 変換ワークフロー

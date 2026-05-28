# Yabi Labs

AI・Web制作・デザイン・自動化の実験室。個人ブランド「Yabi」の技術・研究サイトです。

- **本番URL**: https://yabi-labs.jp
- **姉妹サイト**: [Yabi & Memories](https://yabi-memories.jp/)

---

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| CMS | microCMS |
| ホスティング | Vercel |
| パッケージマネージャ | npm |

---

## ローカル開発のセットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/y-hira777/yabi-labs.git
cd yabi-labs
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、各値を入力してください。

```bash
cp .env.example .env.local
```

必要な変数の詳細は [.env.example](.env.example) を参照してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

---

## npm スクリプト

| コマンド | 内容 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint 実行 |
| `npm run typecheck` | TypeScript 型チェック |
| `npm run format` | Prettier でフォーマット（上書き） |
| `npm run format:check` | Prettier のフォーマットチェック（確認のみ） |
| `npm run check` | typecheck + lint + format:check を一括実行 |

---

## ブランチ運用

```
main        本番環境（yabi-labs.jp）に自動デプロイ
develop     開発統合ブランチ。feature/* からのPRをマージする
feature/*   機能追加・修正用。develop からブランチを切る
```

### 基本的な開発フロー

```bash
# develop から feature ブランチを作成
git switch develop
git switch -c feature/add-article-card

# 作業・コミット
git add .
git commit -m "feat: 記事カードコンポーネントを追加"

# develop へ PR → レビュー → マージ
# develop → main へ PR → マージ → 自動デプロイ
```

> `main` ブランチへの直接 push は原則禁止です。

---

## デプロイ

### 自動デプロイ（コード変更時）

```
ローカル → GitHub (main) → Vercel が自動検知 → 本番デプロイ
```

Vercel は `main` ブランチへの push を自動で検知してビルド・デプロイします。

### 再ビルド（microCMS 記事更新時）

```
microCMS で記事作成・更新
  → microCMS Webhook
  → Vercel Deploy Hook（POST リクエスト）
  → 自動再ビルド
  → 本番反映
```

詳細な設定手順は [docs/deployment.md](docs/deployment.md) を参照してください。

---

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/deployment.md](docs/deployment.md) | GitHub / Vercel / Webhook の設定手順・チェックリスト |
| [docs/automation.md](docs/automation.md) | n8n / AI 自動投稿の設計メモ |

---

## プロジェクト構成

```
src/
├── app/                  # App Router ページ
│   ├── page.tsx          # トップページ
│   ├── articles/         # 記事一覧・詳細
│   ├── categories/       # カテゴリ一覧・詳細
│   ├── tags/             # タグ一覧・詳細
│   ├── about/
│   ├── contact/
│   └── not-found.tsx
├── components/
│   ├── layout/           # Header / Footer / Nav
│   ├── article/          # ArticleCard / ArticleGrid / ArticleBody / ArticleMeta
│   ├── category/         # CategoryBadge
│   ├── tag/              # TagBadge
│   └── ui/               # PageHeader / EmptyState / Eyecatch
├── lib/
│   ├── microcms/         # クライアント・クエリ関数
│   └── utils.ts
└── types/                # 型定義
```

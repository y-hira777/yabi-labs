# デプロイ設定ガイド

GitHub / Vercel / microCMS Webhook の設定手順と、Vercel デプロイ前チェックリストをまとめています。

---

## 全体の自動デプロイフロー

```
【コード変更時】
ローカル開発
  → GitHub (main ブランチ) へ push
  → Vercel が自動検知
  → 本番ビルド・デプロイ
  → https://yabi-labs.jp に反映

【記事更新時】
microCMS で記事を作成・更新・公開
  → microCMS Webhook（POST リクエスト）
  → Vercel Deploy Hook URL
  → 自動再ビルド
  → https://yabi-labs.jp に反映
```

---

## 1. GitHub リポジトリ設定

### 1-1. リポジトリ作成

1. [https://github.com/y-hira777](https://github.com/y-hira777) にアクセス
2. 「New repository」をクリック
3. 以下の設定で作成：
   - **Repository name**: `yabi-labs`
   - **Visibility**: Private
   - **Initialize**: チェックなし（既存プロジェクトを push するため）

### 1-2. ローカルから初回 push

```bash
git init
git add .
git commit -m "feat: Yabi Labs 初期実装"
git remote add origin https://github.com/y-hira777/yabi-labs.git
git branch -M main
git push -u origin main
```

### 1-3. develop ブランチの作成

```bash
git switch -c develop
git push -u origin develop
```

### 1-4. ブランチ保護ルール（推奨）

GitHub の Settings > Branches で `main` ブランチに保護ルールを設定：

- **Require a pull request before merging**: ON
- **Require status checks to pass before merging**: 任意（CI 設定後に有効化）

---

## 2. Vercel プロジェクト設定

### 2-1. プロジェクトのインポート

1. [https://vercel.com/new](https://vercel.com/new) にアクセス
2. 「Import Git Repository」から `y-hira777/yabi-labs` を選択
3. Framework Preset が **Next.js** になっていることを確認
4. **Root Directory**: そのまま（変更不要）

### 2-2. 環境変数の設定

Vercel の「Environment Variables」に以下を設定します。  
値は `.env.local` と同じものを入力してください（**実際の値はここに書かないこと**）。

| 変数名 | 対象環境 | 説明 |
|--------|----------|------|
| `MICROCMS_SERVICE_DOMAIN` | Production / Preview | microCMS サービスドメイン |
| `MICROCMS_API_KEY` | Production / Preview | microCMS API キー |
| `MICROCMS_ENDPOINT_ARTICLES` | Production / Preview | 記事 API エンドポイント名 |
| `MICROCMS_ENDPOINT_CATEGORIES` | Production / Preview | カテゴリ API エンドポイント名 |
| `MICROCMS_ENDPOINT_TAGS` | Production / Preview | タグ API エンドポイント名 |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://yabi-labs.jp` |
| `NEXT_PUBLIC_SITE_URL` | Preview | Vercel の自動発行 URL（省略可） |
| `NEXT_PUBLIC_SITE_NAME` | All | `Yabi Labs` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | All | `AI・Web制作・デザイン・自動化の実験室` |

> **注意**: `MICROCMS_API_KEY` などの秘密情報は Vercel 管理画面でのみ設定し、コードには絶対に書かないこと。

### 2-3. デプロイブランチの設定

Vercel の Settings > Git：

| 設定 | 値 |
|------|----|
| Production Branch | `main` |
| Preview Branch | `develop`（および `feature/*`） |

→ `main` push → 本番デプロイ  
→ `develop` / `feature/*` push → プレビューデプロイ（固有 URL が発行される）

### 2-4. カスタムドメインの設定

1. Vercel の Settings > Domains
2. `yabi-labs.jp` を追加
3. DNS レコードの設定（Vercel が指示する A レコードまたは CNAME を設定）

---

## 3. microCMS Webhook の設定

microCMS で記事を更新したとき、Vercel が自動再ビルドするように Webhook を設定します。

### 3-1. Vercel Deploy Hook URL の発行

1. Vercel の Settings > Git > **Deploy Hooks**
2. 「Add Deploy Hook」をクリック
3. 以下を入力：
   - **Hook Name**: `microcms-webhook`
   - **Branch**: `main`
4. 発行された URL をコピー（例: `https://api.vercel.com/v1/integrations/deploy/xxx/yyy`）

> **注意**: この URL は秘密情報です。公開しないでください。

### 3-2. microCMS 側の Webhook 設定

1. microCMS 管理画面 > API設定 > Webhook
2. 「追加」をクリック
3. 以下を設定：
   - **Webhook名**: `Vercel 再ビルド`
   - **URL**: 3-1 でコピーした Vercel Deploy Hook URL
   - **送信タイミング**: コンテンツの公開・更新・削除時（すべてチェック推奨）
4. 保存

### 3-3. 動作確認

microCMS で記事を更新・公開 → Vercel の Deployments にビルドが開始されることを確認。

---

## 4. 本番・プレビュー環境の使い分け

| 環境 | ブランチ | URL | 用途 |
|------|----------|-----|------|
| 本番（Production） | `main` | https://yabi-labs.jp | 公開サイト |
| プレビュー（Preview） | `develop` / `feature/*` | Vercel 自動発行 URL | 確認・レビュー用 |

- プレビュー環境でも microCMS のデータを参照します（同じ API キー）
- 将来的にステージング用の microCMS 環境を用意する場合は、Vercel の環境変数を環境別に切り替えてください

---

## 5. Vercel デプロイ前チェックリスト

GitHub へ push・デプロイする前に以下を確認してください。

### コード品質

- [ ] `npm run typecheck` がエラーなしで通る
- [ ] `npm run lint` がエラーなしで通る
- [ ] `npm run format:check` がエラーなしで通る
- [ ] `npm run build` がローカルで成功する

### 環境変数

- [ ] Vercel の環境変数に `MICROCMS_SERVICE_DOMAIN` が設定されている
- [ ] Vercel の環境変数に `MICROCMS_API_KEY` が設定されている
- [ ] Vercel の環境変数に `NEXT_PUBLIC_SITE_URL` が `https://yabi-labs.jp` で設定されている
- [ ] `.env.local` が `.gitignore` で除外されていて Git に含まれていない

### セキュリティ

- [ ] APIキー・秘密情報がコード内に直接書かれていない
- [ ] `MICROCMS_API_KEY` などの変数が `NEXT_PUBLIC_` になっていない（クライアントに露出しない）

### microCMS

- [ ] microCMS の API（articles / categories / tags）が作成済み
- [ ] Webhook が設定されていてテスト送信が成功している

### ドメイン

- [ ] Vercel のカスタムドメインに `yabi-labs.jp` が追加されている
- [ ] DNS が正しく設定されている
- [ ] HTTPS が有効になっている

### OGP

- [ ] `public/images/og-default.png`（1200×630px）が配置されている

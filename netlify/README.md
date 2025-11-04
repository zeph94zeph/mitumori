# Netlify 配布パッケージの作成手順

Netlify にドラッグ&ドロップでデプロイできる静的ファイル一式をリポジトリ内で準備するための手順です。

## 必要条件

- Node.js 18 以上
- 依存パッケージをインストール済み (`npm install` および `npm install --workspace client`)

## 手順

1. ルートディレクトリで以下のコマンドを実行します。

   ```bash
   npm run prepare:netlify
   ```

2. コマンド実行後、リポジトリ直下に `netlify-deploy/` フォルダが生成されます。このフォルダには `client` ワークスペースでビルドされたファイルと `netlify.toml` が含まれます。

3. `netlify-deploy/` フォルダを Zip 化し、Netlify の **Deploy your site without connecting to Git** の画面にドラッグ&ドロップするか、以下の Netlify CLI コマンドでデプロイしてください。

   ```bash
   netlify deploy --dir=netlify-deploy --prod
   ```

4. バックエンド API を別ホストで運用する場合は、ビルド前に `client/.env` で `VITE_API_URL` を設定してください。

## 補足

- スクリプトは既存の `netlify-deploy/` フォルダが存在する場合、自動的に削除して再生成します。
- 生成されたフォルダは Git 管理下に置かないことを推奨します。必要に応じて `.gitignore` に追加してください。

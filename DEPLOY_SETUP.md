# 🚀 自動デプロイ設定ガイド

## 概要
このドキュメントは、GitHubからCloudflare Pagesへの自動デプロイを設定する手順です。

## 🔧 設定手順

### 1. GitHub Secretsの設定

1. **GitHubリポジトリにアクセス**
   - URL: https://github.com/atsunaricoda-maker/shizuoka-musicsupport

2. **Settingsタブをクリック**
   - リポジトリページの上部メニューから選択

3. **Secrets and variables → Actions**
   - 左側メニューから選択

4. **New repository secret をクリック**
   - 以下の2つのSecretを追加

#### Secret 1: Cloudflare API Token
```
Name: CLOUDFLARE_API_TOKEN
Value: [Cloudflare APIトークン - Deploy タブで設定したもの]
```

#### Secret 2: Cloudflare Account ID
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: a7aa574979ee060d018d056ebb97805b
```

### 2. 自動デプロイの動作確認

設定完了後、以下の手順でテスト：

1. **コードを変更** (例: src/config.ts の一部を編集)
2. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "テスト: 自動デプロイ確認"
   git push origin main
   ```
3. **GitHub Actionsで実行状況確認**
   - GitHubリポジトリの「Actions」タブで進行状況を確認
4. **デプロイ完了確認**
   - Cloudflare Pagesで新しいデプロイが作成されることを確認

## 🎯 自動デプロイ後の編集フロー

### NPOスタッフの場合
1. 編集内容を技術担当者にメールで依頼
2. 技術担当者が対応
3. 自動でサイト更新完了

### 技術担当者の場合
1. `src/config.ts` ファイルを編集
2. GitHubにプッシュ
3. **自動でビルド・デプロイ実行** ← NEW!
4. 数分でサイト更新完了

## ⚡ メリット

- **手動デプロイ不要**: `wrangler pages deploy` コマンド実行不要
- **即座に反映**: プッシュから数分でサイト更新
- **エラー通知**: デプロイ失敗時はGitHubで確認可能
- **履歴管理**: すべての変更がGitHubで追跡可能

## 🔍 トラブルシューティング

### デプロイが失敗する場合
1. GitHub Actionsの「Actions」タブでエラーログを確認
2. Cloudflare API Tokenの有効性を確認
3. プロジェクト名 `shizuoka-music-npo` が正しいことを確認

### サイトが更新されない場合
1. ビルドエラーがないかActionログを確認
2. Cloudflare Pagesダッシュボードで最新デプロイを確認
3. ブラウザのキャッシュをクリア

## 📞 サポート

問題が発生した場合は、技術担当者にご連絡ください：
- Email: tech-support@shizuoka-musicsupport.jp
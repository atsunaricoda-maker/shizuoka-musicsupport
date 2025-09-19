# 🚀 Cloudflare Pages 自動デプロイ設定ガイド

GitHub Actionsの代わりに、Cloudflare Pages公式のGitHub連携を使用します。

## 📋 **設定手順**

### **ステップ1: Cloudflare Pages ダッシュボードにアクセス**

1. **Cloudflare ダッシュボード**にログイン: https://dash.cloudflare.com/
2. **Pages** セクションに移動
3. **shizuoka-music-npo** プロジェクトを選択

### **ステップ2: GitHubリポジトリを接続**

1. **Settings** タブをクリック
2. **Source** セクションの **Connect to Git** をクリック
3. **GitHub** を選択
4. **リポジトリを選択**: `atsunaricoda-maker/shizuoka-musicsupport`
5. **Production branch**: `main` を設定

### **ステップ3: ビルド設定**

以下のビルド設定を入力：

- **Framework preset**: `None` または `Hono`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (空白または指定なし)

### **ステップ4: 環境変数設定（必要に応じて）**

現在の設定では特に環境変数は不要ですが、将来的に必要な場合：

- **Settings** → **Environment variables** で追加

## ✅ **設定完了後の動作**

設定完了後、以下の自動デプロイが有効になります：

### **🔄 自動デプロイフロー**
1. **GitHubのmainブランチにプッシュ**
2. **Cloudflare Pages が変更を自動検知**
3. **npm run build で自動ビルド**
4. **新しいバージョンを自動デプロイ**
5. **サイトURL更新完了**

### **📊 デプロイ状況の確認**
- **Cloudflare Pages ダッシュボード**の **Deployments** タブ
- **GitHub リポジトリ**の **Commits** でステータス確認
- **新しいデプロイURL**の自動生成

## 🎯 **NPOスタッフの編集フロー**

自動デプロイ設定完了後の編集フロー：

### **方法1: GitHub Web編集（推奨）**
1. https://github.com/atsunaricoda-maker/shizuoka-musicsupport にアクセス
2. `src/config.ts` ファイルを開く
3. 鉛筆アイコン ✏️ をクリックして編集
4. 変更後 **Commit changes** をクリック
5. **数分で自動的にサイト更新**

### **方法2: 技術担当者経由**
1. NPOスタッフ → 技術担当者にメール依頼
2. 技術担当者 → GitHubで編集
3. 自動デプロイ → サイト更新完了

## 📈 **メリット**

- ✅ **GitHub Actions不要** - 権限問題なし
- ✅ **Cloudflare公式** - 安定した連携
- ✅ **自動プレビュー** - プルリクエスト用プレビューURL
- ✅ **ロールバック機能** - 過去バージョンへの復旧可能
- ✅ **デプロイ履歴** - 全ての変更履歴を保持

## 🔧 **トラブルシューティング**

### よくある問題：
1. **ビルドエラー**: package.json の依存関係を確認
2. **アクセス権限**: GitHubリポジトリの権限を確認
3. **ブランチ設定**: main ブランチが正しく設定されているか

---

**設定完了後は config.ts 編集 → GitHub プッシュで自動更新！**
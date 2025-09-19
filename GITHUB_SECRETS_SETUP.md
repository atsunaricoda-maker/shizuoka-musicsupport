# 🔐 GitHubシークレット設定ガイド

自動デプロイを有効にするために、GitHubリポジトリにCloudflare認証情報を設定する必要があります。

## 📋 **設定手順**

### **ステップ1: GitHubリポジトリの設定画面にアクセス**

1. **GitHubリポジトリ**を開く: https://github.com/atsunaricoda-maker/shizuoka-musicsupport
2. **Settings** タブをクリック
3. 左サイドバーの **Secrets and variables** → **Actions** をクリック

### **ステップ2: シークレット追加**

以下の2つのシークレットを追加してください：

#### **1. CLOUDFLARE_API_TOKEN**
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: `(現在のAPIトークン)`
  - 確認方法: Deploy タブで設定したのと同じトークン
  - または新規作成: https://dash.cloudflare.com/profile/api-tokens

#### **2. CLOUDFLARE_ACCOUNT_ID**
- **Name**: `CLOUDFLARE_ACCOUNT_ID`  
- **Value**: `a7aa574979ee060d018d056ebb97805b`

### **ステップ3: シークレット追加方法**

1. **New repository secret** ボタンをクリック
2. **Name** に上記の名前を入力
3. **Secret** に上記の値を入力
4. **Add secret** をクリック
5. 両方のシークレットに対して繰り返し

## ✅ **設定完了後の動作**

シークレット設定完了後、以下の動作が自動化されます：

1. **mainブランチにコードプッシュ**
2. **GitHub Actionsが自動実行**
3. **npm run build** で自動ビルド
4. **Cloudflare Pagesに自動デプロイ**
5. **サイト自動更新完了**

## 🎯 **自動デプロイの確認**

設定完了後は以下で確認できます：

1. **GitHubリポジトリの Actions タブ**でワークフロー実行状況
2. **Cloudflare Pages ダッシュボード**でデプロイ状況  
3. **サイトURL**で更新内容

## 📞 **トラブルシューティング**

設定に問題がある場合：

1. **シークレット名が正確か確認**
2. **API トークンの権限を確認**
3. **Account ID が正しいか確認**
4. **GitHub Actions のログを確認**

---

**設定完了後は、config.ts を編集 → GitHub にプッシュするだけで自動更新されます！**
# 🎵 NPO法人しずおか音楽文化支援協議会 サイト管理移譲ガイド

## 📋 **移譲される資産一覧**

### 🌐 **ウェブサイト**
- **URL**: https://[your-domain].pages.dev
- **プラットフォーム**: Cloudflare Pages
- **技術**: Hono + TypeScript + TailwindCSS
- **運用コスト**: 完全無料

### 📁 **ソースコード**
- **GitHub**: https://github.com/[organization]/shizuoka-music-npo
- **メイン設定ファイル**: `src/config.ts`
- **編集ガイド**: `EDIT_GUIDE.md`
- **対話型編集**: `edit-demo.js`

## 👤 **管理者権限移譲手順**

### 1️⃣ **Cloudflare アカウント**
```bash
# 新管理者をCloudflareアカウントに招待
1. Cloudflareダッシュボード → Manage Account → Members
2. NPO担当者のメールアドレスを招待
3. Role: Administrator を選択
4. 招待メール経由でアカウント作成
```

### 2️⃣ **GitHub リポジトリ**
```bash
# リポジトリ所有権移譲 or コラボレーター追加
1. GitHub リポジトリ → Settings → Manage access
2. NPO担当者を Admin として招待
3. または組織アカウントに移譲
```

### 3️⃣ **ドメイン設定**
```bash
# 既存Google Workspaceドメインの接続
1. Cloudflareにドメイン追加
2. DNS設定でPagesプロジェクトに接続
3. SSL証明書自動設定確認
```

## 🔧 **日常的な管理タスク**

### ✏️ **コンテンツ編集**
- **簡単編集**: `src/config.ts` ファイル編集のみ
- **ガイド**: `EDIT_GUIDE.md` 参照
- **対話型**: `node edit-demo.js` 実行

### 🚀 **デプロイ**
```bash
# 変更をサイトに反映
git add .
git commit -m "コンテンツ更新"
git push origin main
# → 自動でサイト更新
```

### 📊 **監視項目**
- **アクセス数**: Cloudflareダッシュボード
- **Google Ad Grants**: 月次レポート
- **サイト稼働状況**: 24時間監視

## 📞 **サポート体制**

### 🆘 **緊急時連絡**
- **技術的問題**: GitHub Issues
- **ドメイン問題**: Google Workspace管理者
- **広告運用**: Google Ad Grants担当

### 📚 **学習リソース**
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **GitHub基礎**: https://docs.github.com/ja
- **Google Ad Grants**: https://www.google.com/grants/

## ✅ **移譲チェックリスト**

### 🔐 **アカウント・権限**
- [ ] Cloudflareアカウント招待完了
- [ ] GitHub権限付与完了
- [ ] Google Workspace連携確認
- [ ] API Token移譲完了

### 📝 **ドキュメント**
- [ ] 編集ガイド確認
- [ ] 緊急時手順確認
- [ ] 連絡先情報更新

### 🧪 **動作テスト**
- [ ] コンテンツ編集テスト
- [ ] デプロイテスト
- [ ] ドメイン接続テスト
- [ ] SSL証明書確認

## 🎯 **移譲後の運用方針**

### 📈 **成長戦略**
- Google Ad Grants活用（月150万円）
- SEO最適化継続
- 地域パートナーシップ拡大
- イベント情報の定期更新

### 🔄 **メンテナンス**
- 月1回のコンテンツ更新
- 四半期ごとの機能見直し
- 年1回の大幅リニューアル検討

---

**移譲完了日**: ___/___/___
**移譲責任者**: _______________
**引き継ぎ担当者**: _______________
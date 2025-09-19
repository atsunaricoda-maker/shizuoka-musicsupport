// 🔐 シンプルな管理画面（エラーなし版）

import { Hono } from 'hono';
import { siteConfig } from './config';

const adminApp = new Hono();

// 🔐 ログイン画面
adminApp.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>管理画面 - しずおか音楽文化支援協議会</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body { font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', sans-serif; }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div class="min-h-screen flex items-center justify-center py-12 px-4">
            <div class="max-w-md w-full space-y-8">
                <div class="text-center">
                    <i class="fas fa-music text-6xl text-indigo-600 mb-4"></i>
                    <h1 class="text-3xl font-bold text-gray-900">管理画面</h1>
                    <p class="mt-2 text-sm text-gray-600">しずおか音楽文化支援協議会</p>
                </div>
                
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold mb-4">パスワードでログイン</h2>
                    <form method="POST" action="/admin/login">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                管理者パスワード
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="パスワードを入力"
                            >
                        </div>
                        <button 
                            type="submit"
                            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            ログイン
                        </button>
                    </form>
                </div>
                
                <div class="text-center">
                    <a href="/" class="text-indigo-600 hover:text-indigo-800 text-sm">
                        <i class="fas fa-arrow-left mr-1"></i>
                        サイトに戻る
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// 🔐 ログイン処理
adminApp.post('/login', async (c) => {
  try {
    const formData = await c.req.formData();
    const password = formData.get('password') as string;
    
    if (password === 'shizuoka-music-2025') {
      return c.redirect('/admin/dashboard');
    } else {
      return c.html(`
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <title>ログイン失敗</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 min-h-screen flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h1 class="text-2xl font-bold text-red-600 mb-4">ログイン失敗</h1>
                <p class="text-gray-600 mb-4">パスワードが正しくありません。</p>
                <a href="/admin" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    もう一度試す
                </a>
            </div>
        </body>
        </html>
      `);
    }
  } catch (error) {
    return c.text('エラーが発生しました', 500);
  }
});

// 📊 管理ダッシュボード
adminApp.get('/dashboard', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>サイト管理 - しずおか音楽文化支援協議会</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body { font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-100">
        <!-- ヘッダー -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <i class="fas fa-music text-indigo-600 text-2xl mr-3"></i>
                        <h1 class="text-xl font-semibold text-gray-900">サイト管理</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="/" target="_blank" class="text-gray-600 hover:text-gray-900">
                            <i class="fas fa-external-link-alt mr-1"></i>
                            サイトを見る
                        </a>
                        <a href="/admin/logout" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-sign-out-alt mr-1"></i>
                            ログアウト
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">管理メニュー</h2>
            
            <!-- 機能一覧 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <!-- 現在は設定ファイル編集の案内 -->
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-edit text-blue-600 text-2xl mr-3"></i>
                        <h3 class="text-lg font-semibold">コンテンツ編集</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        現在はGitHubでファイルを直接編集する方式です
                    </p>
                    <div class="space-y-2 text-sm text-gray-600">
                        <p><strong>編集ファイル:</strong> src/config.ts</p>
                        <p><strong>方法:</strong> GitHub経由でファイル編集</p>
                        <p><strong>反映:</strong> 自動デプロイ</p>
                    </div>
                </div>

                <!-- サイト情報 -->
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-info-circle text-green-600 text-2xl mr-3"></i>
                        <h3 class="text-lg font-semibold">サイト情報</h3>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p><span class="text-gray-600">お知らせ:</span> ${siteConfig.news.length}件</p>
                        <p><span class="text-gray-600">イベント:</span> ${siteConfig.events.length}件</p>
                        <p><span class="text-gray-600">FAQ:</span> ${siteConfig.faq.length}件</p>
                        <p><span class="text-gray-600">スタッフ:</span> ${siteConfig.staff.length}名</p>
                    </div>
                </div>

                <!-- GitHubリンク -->
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center mb-4">
                        <i class="fab fa-github text-gray-800 text-2xl mr-3"></i>
                        <h3 class="text-lg font-semibold">GitHub編集</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        GitHubでファイルを直接編集
                    </p>
                    <button 
                        onclick="alert('GitHub連携は次のステップで実装予定です')"
                        class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
                    >
                        <i class="fab fa-github mr-1"></i>
                        GitHub を開く
                    </button>
                </div>
                
            </div>

            <!-- 次回実装予定 -->
            <div class="mt-12 bg-blue-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-blue-900 mb-4">
                    <i class="fas fa-rocket mr-2"></i>
                    次回実装予定の機能
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">フォーム編集機能</h4>
                        <ul class="text-blue-700 space-y-1">
                            <li>• ブラウザでお知らせ編集</li>
                            <li>• イベント情報の追加・削除</li>
                            <li>• FAQ の管理</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">高度な機能</h4>
                        <ul class="text-blue-700 space-y-1">
                            <li>• 画像アップロード機能</li>
                            <li>• プレビュー機能</li>
                            <li>• バックアップ・復元</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// ログアウト
adminApp.get('/logout', (c) => {
  return c.redirect('/admin');
});

// テスト用
adminApp.get('/test', (c) => {
  return c.text('管理画面テスト OK! 🎵');
});

export default adminApp;
// 🔐 超簡単な管理画面システム

import { Hono } from 'hono';
import { siteConfig } from './config';
// import type { AdminBindings, SiteContent } from './types/admin';

type AdminBindings = {
  ADMIN_CONTENT: KVNamespace;
};

const adminApp = new Hono<{ Bindings: AdminBindings }>();

// 🛡️ 簡単な認証チェック
const AUTH_PASSWORD = 'shizuoka-music-2025'; // 本番では環境変数に

function checkAuth(req: Request): boolean {
  const cookie = req.headers.get('Cookie');
  return cookie?.includes('admin-auth=true') || false;
}

// 🔐 ログイン画面
adminApp.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>管理画面 - ${siteConfig.siteName}</title>
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
                    <h1 class="text-3xl font-bold text-gray-900">
                        管理画面ログイン
                    </h1>
                    <p class="mt-2 text-sm text-gray-600">
                        ${siteConfig.siteName}
                    </p>
                </div>
                
                <form class="mt-8 space-y-6" action="/admin/login" method="POST">
                    <div class="bg-white p-8 rounded-lg shadow-md">
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                                パスワード
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="管理パスワードを入力"
                            >
                        </div>
                        
                        <button 
                            type="submit"
                            class="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            ログイン
                        </button>
                    </div>
                </form>
                
                <div class="text-center text-sm text-gray-500">
                    <p>
                        <i class="fas fa-lock mr-1"></i>
                        このページは管理者専用です
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// 🔐 ログイン処理
adminApp.post('/login', async (c) => {
  const formData = await c.req.formData();
  const password = formData.get('password') as string;
  
  if (password === AUTH_PASSWORD) {
    // 簡易セッション（本番では更にセキュアに）
    c.header('Set-Cookie', 'admin-auth=true; HttpOnly; SameSite=Strict; Max-Age=3600');
    return c.redirect('/admin/dashboard');
  } else {
    return c.redirect('/admin?error=invalid');
  }
});

// 📊 管理ダッシュボード
adminApp.get('/dashboard', (c) => {
  if (!checkAuth(c.req.raw)) {
    return c.redirect('/admin');
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>サイト管理 - ${siteConfig.siteName}</title>
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
            <!-- 操作メニュー -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                
                <!-- お知らせ管理 -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-bullhorn text-blue-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">お知らせ管理</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        新しいお知らせの追加や既存のお知らせの編集ができます
                    </p>
                    <a href="/admin/news" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-edit mr-1"></i>
                        編集する
                    </a>
                </div>

                <!-- イベント管理 -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-calendar-alt text-green-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">イベント管理</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        演奏会やワークショップの予定を管理できます
                    </p>
                    <a href="/admin/events" class="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-calendar-plus mr-1"></i>
                        編集する
                    </a>
                </div>

                <!-- 基本情報管理 -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-cog text-purple-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">基本情報管理</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        サイトのタイトルやメッセージを変更できます
                    </p>
                    <a href="/admin/settings" class="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-tools mr-1"></i>
                        編集する
                    </a>
                </div>

                <!-- FAQ管理 -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-question-circle text-orange-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">FAQ管理</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        よくある質問と回答を管理できます
                    </p>
                    <a href="/admin/faq" class="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-question mr-1"></i>
                        編集する
                    </a>
                </div>

                <!-- スタッフ管理 -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-users text-indigo-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">スタッフ管理</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        講師やスタッフの紹介を編集できます
                    </p>
                    <a href="/admin/staff" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-user-edit mr-1"></i>
                        編集する
                    </a>
                </div>

                <!-- プレビュー -->
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-eye text-teal-600 text-2xl mr-3"></i>
                        <h2 class="text-lg font-semibold">プレビュー</h2>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">
                        変更内容をプレビューで確認できます
                    </p>
                    <a href="/admin/preview" class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                        <i class="fas fa-search mr-1"></i>
                        確認する
                    </a>
                </div>
                
            </div>

            <!-- クイックステータス -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center">
                    <i class="fas fa-chart-line text-gray-600 mr-2"></i>
                    サイト状況
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-600">${siteConfig.news.length}</div>
                        <div class="text-sm text-gray-600">お知らせ</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">${siteConfig.events.length}</div>
                        <div class="text-sm text-gray-600">イベント</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-600">${siteConfig.faq.length}</div>
                        <div class="text-sm text-gray-600">FAQ項目</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-indigo-600">${siteConfig.staff.length}</div>
                        <div class="text-sm text-gray-600">スタッフ</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// 📰 お知らせ管理画面
adminApp.get('/news', (c) => {
  if (!checkAuth(c.req.raw)) {
    return c.redirect('/admin');
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>お知らせ管理 - ${siteConfig.siteName}</title>
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
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-900 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <i class="fas fa-bullhorn text-blue-600 text-xl mr-3"></i>
                        <h1 class="text-xl font-semibold text-gray-900">お知らせ管理</h1>
                    </div>
                    <button 
                        onclick="showAddForm()"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        <i class="fas fa-plus mr-1"></i>
                        新しいお知らせ
                    </button>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <!-- 新規追加フォーム（初期は非表示） -->
            <div id="addForm" class="bg-white rounded-lg shadow p-6 mb-6" style="display: none;">
                <h2 class="text-lg font-semibold mb-4">新しいお知らせを追加</h2>
                <form action="/admin/news/add" method="POST" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                        <input type="text" name="title" required 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="例：新しい楽器寄付プログラムを開始します">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">日付</label>
                            <input type="date" name="date" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
                            <select name="category" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="お知らせ">お知らせ</option>
                                <option value="イベント">イベント</option>
                                <option value="支援募集">支援募集</option>
                                <option value="活動報告">活動報告</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
                        <textarea name="content" rows="4" required
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="お知らせの詳細内容を入力してください..."></textarea>
                    </div>
                    <div class="flex space-x-3">
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                            <i class="fas fa-save mr-1"></i>
                            保存
                        </button>
                        <button type="button" onclick="hideAddForm()" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">
                            キャンセル
                        </button>
                    </div>
                </form>
            </div>

            <!-- 既存お知らせ一覧 -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold">現在のお知らせ</h2>
                </div>
                <div class="divide-y divide-gray-200">
                    ${siteConfig.news.map((item, index) => `
                        <div class="p-6 hover:bg-gray-50">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3 mb-2">
                                        <h3 class="text-lg font-medium text-gray-900">${item.title}</h3>
                                        <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            ${item.category}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-500 mb-2">
                                        <i class="fas fa-calendar mr-1"></i>
                                        ${item.date}
                                    </p>
                                    <p class="text-gray-700 text-sm leading-relaxed">
                                        ${item.content}
                                    </p>
                                </div>
                                <div class="ml-4 flex space-x-2">
                                    <button onclick="editNews(${index})" class="text-gray-600 hover:text-blue-600">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteNews(${index})" class="text-gray-600 hover:text-red-600">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <script>
            function showAddForm() {
                document.getElementById('addForm').style.display = 'block';
                document.querySelector('input[name="title"]').focus();
            }
            
            function hideAddForm() {
                document.getElementById('addForm').style.display = 'none';
            }
            
            function editNews(index) {
                alert('編集機能は次のステップで実装します！');
            }
            
            function deleteNews(index) {
                if (confirm('このお知らせを削除しますか？')) {
                    alert('削除機能は次のステップで実装します！');
                }
            }
        </script>
    </body>
    </html>
  `);
});

// ログアウト
adminApp.get('/logout', (c) => {
  c.header('Set-Cookie', 'admin-auth=; HttpOnly; SameSite=Strict; Max-Age=0');
  return c.redirect('/admin');
});

// テスト用ルート
adminApp.get('/test', (c) => {
  return c.html('<h1>管理画面テストOK!</h1><a href="/admin">ログインに戻る</a>');
});

export default adminApp;
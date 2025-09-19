// 🔧 超シンプルな管理システム（エラー回避版）

import { Hono } from 'hono';

const adminApp = new Hono();

// シンプルな管理画面（HTMLのみ、複雑なロジックなし）
adminApp.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>簡単編集ガイド - しずおか音楽文化支援協議会</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="max-w-4xl mx-auto py-8 px-4">
            
            <!-- ヘッダー -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <i class="fas fa-edit text-blue-600 text-3xl mr-4"></i>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">サイト編集ガイド</h1>
                            <p class="text-gray-600">しずおか音楽文化支援協議会</p>
                        </div>
                    </div>
                    <a href="/" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                        <i class="fas fa-home mr-2"></i>
                        サイトに戻る
                    </a>
                </div>
            </div>

            <!-- 編集方法の説明 -->
            <div class="space-y-6">
                
                <!-- 方法1: GitHub編集 -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center mb-4">
                        <i class="fab fa-github text-gray-800 text-2xl mr-3"></i>
                        <h2 class="text-xl font-bold text-gray-900">方法1: GitHub で編集（推奨）</h2>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                        <p class="text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            <strong>最も安全で確実な方法です</strong>
                        </p>
                    </div>

                    <div class="space-y-3 text-gray-700">
                        <h3 class="font-semibold text-gray-900">手順:</h3>
                        <div class="pl-4 space-y-2">
                            <p><span class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">1.</span> GitHubアカウントでログイン</p>
                            <p><span class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">2.</span> プロジェクトリポジトリを開く</p>
                            <p><span class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">3.</span> <code class="bg-gray-100 px-1 rounded">src/config.ts</code> ファイルを編集</p>
                            <p><span class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">4.</span> 変更を保存（Commit）</p>
                            <p><span class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">5.</span> 自動でサイトが更新される</p>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button onclick="alert('GitHubリンクは次のステップで設定します')" 
                                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md">
                            <i class="fab fa-github mr-2"></i>
                            GitHub で編集
                        </button>
                    </div>
                </div>

                <!-- 方法2: ファイル編集 -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-file-code text-green-600 text-2xl mr-3"></i>
                        <h2 class="text-xl font-bold text-gray-900">方法2: 設定ファイル編集</h2>
                    </div>

                    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                        <p class="text-green-800">
                            <i class="fas fa-lightbulb mr-2"></i>
                            <strong>編集するファイル:</strong> <code>src/config.ts</code>
                        </p>
                    </div>

                    <div class="space-y-3 text-gray-700">
                        <h3 class="font-semibold text-gray-900">編集可能な内容:</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <p>✅ サイト名・メッセージ</p>
                                <p>✅ お知らせ・ニュース</p>
                                <p>✅ イベント情報</p>
                            </div>
                            <div class="space-y-2">
                                <p>✅ FAQ（よくある質問）</p>
                                <p>✅ スタッフ紹介</p>
                                <p>✅ プログラム内容</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 現在のサイト状況 -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-chart-bar text-purple-600 text-2xl mr-3"></i>
                        <h2 class="text-xl font-bold text-gray-900">現在のサイト状況</h2>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div class="bg-blue-50 p-3 rounded">
                            <div class="text-2xl font-bold text-blue-600">6</div>
                            <div class="text-sm text-gray-600">お知らせ</div>
                        </div>
                        <div class="bg-green-50 p-3 rounded">
                            <div class="text-2xl font-bold text-green-600">8</div>
                            <div class="text-sm text-gray-600">イベント</div>
                        </div>
                        <div class="bg-orange-50 p-3 rounded">
                            <div class="text-2xl font-bold text-orange-600">6</div>
                            <div class="text-sm text-gray-600">FAQ</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded">
                            <div class="text-2xl font-bold text-purple-600">7</div>
                            <div class="text-sm text-gray-600">スタッフ</div>
                        </div>
                    </div>
                </div>

                <!-- 連絡先 -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-headset text-teal-600 text-2xl mr-3"></i>
                        <h2 class="text-xl font-bold text-gray-900">サポート・お問い合わせ</h2>
                    </div>

                    <div class="text-gray-700 space-y-3">
                        <p>サイト編集でご不明な点がございましたら、お気軽にお問い合わせください。</p>
                        
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="mailto:info@shizuoka-musicsupport.jp" 
                               class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-center">
                                <i class="fas fa-envelope mr-2"></i>
                                メールでお問い合わせ
                            </a>
                            <a href="tel:054-123-4567" 
                               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center">
                                <i class="fas fa-phone mr-2"></i>
                                電話でお問い合わせ
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </body>
    </html>
  `);
});

export default adminApp;
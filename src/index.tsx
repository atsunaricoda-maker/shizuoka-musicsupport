import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { siteConfig, newsConfig, eventsConfig, staffConfig, programsConfig, faqConfig } from './config'
import adminApp from './admin-simple'

const app = new Hono()

// CORS設定
app.use('/api/*', cors())

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }))

// レンダラー設定
app.use(renderer)

// 共通ナビゲーション
const Navigation = () => (
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <i class="fas fa-music text-blue-600 text-2xl"></i>
          <div>
            <a href="/" class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">しずおか音楽文化支援協議会</a>
            <p class="text-xs text-gray-600">NPO法人</p>
          </div>
        </div>
        <div class="hidden md:flex space-x-6">
          <a href="/" class="text-gray-600 hover:text-blue-600 transition-colors">ホーム</a>
          <a href="/news" class="text-gray-600 hover:text-blue-600 transition-colors">ニュース</a>
          <a href="/programs" class="text-gray-600 hover:text-blue-600 transition-colors">活動詳細</a>
          <a href="/events" class="text-gray-600 hover:text-blue-600 transition-colors">イベント</a>
          <a href="/staff" class="text-gray-600 hover:text-blue-600 transition-colors">講師紹介</a>
          <a href="/faq" class="text-gray-600 hover:text-blue-600 transition-colors">Q&A</a>
          <a href="/#contact" class="text-gray-600 hover:text-blue-600 transition-colors">お問い合わせ</a>
        </div>
        {/* モバイルメニュー */}
        <div class="md:hidden">
          <button id="mobile-menu-btn" class="text-gray-600 hover:text-blue-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      {/* モバイルメニュー展開部分 */}
      <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-2">
        <a href="/" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">ホーム</a>
        <a href="/news" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">ニュース</a>
        <a href="/programs" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">活動詳細</a>
        <a href="/events" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">イベント</a>
        <a href="/staff" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">講師紹介</a>
        <a href="/faq" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">Q&A</a>
        <a href="/#contact" class="block text-gray-600 hover:text-blue-600 transition-colors py-2">お問い合わせ</a>
      </div>
    </nav>
  </header>
)

// 共通フッター
const Footer = () => (
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <i class="fas fa-music text-blue-400 text-2xl"></i>
            <div>
              <h5 class="font-semibold">しずおか音楽文化支援協議会</h5>
              <p class="text-sm text-gray-400">特定非営利活動法人</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm">
            音楽で成長する子どもたちとともに、地域のつながりを創出するために活動しています。
          </p>
        </div>
        
        <div>
          <h6 class="font-semibold mb-3">お問い合わせ</h6>
          <div class="space-y-2 text-sm text-gray-400">
            <p><i class="fas fa-envelope mr-2"></i> info@shizuoka-musicsupport.jp</p>
            <p><i class="fas fa-globe mr-2"></i> https://www.shizuoka-musicsupport.jp</p>
          </div>
        </div>
        
        <div>
          <h6 class="font-semibold mb-3">関連リンク</h6>
          <div class="space-y-2 text-sm">
            <a href="https://sumiya-goody.co.jp/" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i>
              すみやグッディ
            </a>
            <a href="mailto:info@shizuoka-musicsupport.jp" class="text-gray-400 hover:text-white transition-colors flex items-center">
              <i class="fas fa-envelope mr-2"></i>
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 特定非営利活動法人しずおか音楽文化支援協議会. All rights reserved.</p>
        <p class="mt-2">※本サイトは非営利目的で運営されています（Google Ad Grants対応）</p>
      </div>
    </div>
  </footer>
)

// メインページ
app.get('/', (c) => {
  return c.render(
    <div>
      <Navigation />

      {/* ヒーローセクション */}
      <section class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20" style="background-image: url('https://images.stockcake.com/public/b/f/2/bf25fc5e-a5f8-4b51-b3b1-8d65ba0b4aa7_large/youth-band-practice-stockcake.jpg'); background-size: cover; background-position: center; background-blend-mode: overlay;">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-purple-800/80 to-pink-800/80"></div>
        <div class="relative container mx-auto px-4 text-center">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-bold mb-6">
              {siteConfig.hero.title}<br />
              <span class="text-yellow-300">{siteConfig.hero.subtitle}</span>
            </h2>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
              {siteConfig.hero.description}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#activities" class="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 inline-flex items-center">
                <i class="fas fa-play mr-2"></i>
                {siteConfig.hero.buttons.primary}
              </a>
              <a href="#contact" class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all inline-flex items-center">
                <i class="fas fa-envelope mr-2"></i>
                {siteConfig.hero.buttons.secondary}
              </a>
            </div>
          </div>
        </div>
        
        {/* 装飾的な音符とアニメーション */}
        <div class="absolute top-20 left-10 text-6xl opacity-30 text-yellow-300 musical-note">♪</div>
        <div class="absolute bottom-20 right-10 text-5xl opacity-25 text-white musical-note">♫</div>
        <div class="absolute top-1/2 left-1/4 text-4xl opacity-20 text-yellow-200 musical-note">♬</div>
        <div class="absolute top-32 right-1/4 text-3xl opacity-25 text-white musical-note">♩</div>
        <div class="absolute bottom-32 left-1/3 text-4xl opacity-30 text-yellow-300 musical-note">♭</div>
        <div class="absolute top-3/4 right-12 text-2xl opacity-20 text-white musical-note">♯</div>
      </section>

      {/* 画像ギャラリーセクション */}
      <section class="py-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">活動の様子</h3>
            <div class="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              中学生の皆さんが楽しく音楽活動に取り組んでいる様子をご覧ください
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* 練習風景 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <img 
                src="https://cdn1.genspark.ai/user-upload-image/3_generated/71afa1f7-9703-4583-bba8-d80e974055f0" 
                alt="中学生吹奏楽部の練習風景" 
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">楽しい練習風景</h4>
                <p class="text-gray-600 text-sm">仲間と一緒に楽しく練習しています</p>
              </div>
            </div>

            {/* グループ演奏 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <img 
                src="https://images.stockcake.com/public/b/f/2/bf25fc5e-a5f8-4b51-b3b1-8d65ba0b4aa7_large/youth-band-practice-stockcake.jpg" 
                alt="青少年バンド練習" 
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">アンサンブル練習</h4>
                <p class="text-gray-600 text-sm">息の合った演奏を目指して</p>
              </div>
            </div>

            {/* 指導風景 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <div class="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div class="text-center text-white">
                  <i class="fas fa-music text-4xl mb-3"></i>
                  <h4 class="text-lg font-semibold">専門指導</h4>
                  <p class="text-sm opacity-90">経験豊富な講師陣</p>
                </div>
              </div>
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">専門指導体制</h4>
                <p class="text-gray-600 text-sm">プロの講師による丁寧な指導</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 協議会について */}
      <section id="about" class="py-16 bg-white bg-sound-waves relative overflow-hidden">
        <div class="container mx-auto px-4">
          {/* 背景装飾音符 */}
          <div class="absolute top-10 left-10 text-2xl opacity-10 text-blue-300">♪</div>
          <div class="absolute bottom-10 right-10 text-3xl opacity-10 text-purple-300">♫</div>
          <div class="absolute top-1/2 right-20 text-xl opacity-10 text-pink-300">♬</div>
          
          <div class="text-center mb-12 relative z-10">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">{siteConfig.about.title}</h3>
            <div class="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              {siteConfig.about.description}
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {siteConfig.about.features.map((feature, index) => (
              <div class={`text-center p-6 rounded-lg ${index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-purple-50' : 'bg-pink-50'} hover:shadow-lg transition-shadow musical-hover`}>
                <div class={`w-16 h-16 ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-purple-600' : 'bg-pink-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i class={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h4 class="text-xl font-semibold mb-3">{feature.title}</h4>
                <p class="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 楽器紹介セクション */}
      <section class="py-16 bg-gradient-to-r from-purple-50 to-pink-50 relative">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">扱っている楽器</h3>
            <div class="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p class="text-lg text-gray-600">吹奏楽で使用される様々な楽器をサポートしています</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {/* 管楽器アイコン */}
            <div class="text-center p-6 bg-white rounded-lg shadow-lg musical-hover">
              <div class="text-5xl mb-4">🎺</div>
              <h4 class="font-semibold text-gray-800">金管楽器</h4>
              <p class="text-sm text-gray-600 mt-2">トランペット<br />ホルン<br />トロンボーン</p>
            </div>

            <div class="text-center p-6 bg-white rounded-lg shadow-lg musical-hover">
              <div class="text-5xl mb-4">🎷</div>
              <h4 class="font-semibold text-gray-800">木管楽器</h4>
              <p class="text-sm text-gray-600 mt-2">サックス<br />クラリネット<br />フルート</p>
            </div>

            <div class="text-center p-6 bg-white rounded-lg shadow-lg musical-hover">
              <div class="text-5xl mb-4">🥁</div>
              <h4 class="font-semibold text-gray-800">打楽器</h4>
              <p class="text-sm text-gray-600 mt-2">ドラム<br />ティンパニ<br />木琴</p>
            </div>

            <div class="text-center p-6 bg-white rounded-lg shadow-lg musical-hover">
              <div class="text-5xl mb-4">🎶</div>
              <h4 class="font-semibold text-gray-800">その他</h4>
              <p class="text-sm text-gray-600 mt-2">指揮<br />楽譜管理<br />音響機材</p>
            </div>
          </div>
        </div>
      </section>

      {/* 活動内容 */}
      <section id="activities" class="py-16 bg-gray-50 bg-instruments relative">
        <div class="container mx-auto px-4">
          {/* 背景装飾楽器 */}
          <div class="absolute top-16 left-8 text-4xl opacity-8 text-yellow-400">🎺</div>
          <div class="absolute bottom-16 right-8 text-3xl opacity-8 text-blue-400">🎷</div>
          <div class="absolute top-1/3 right-16 text-2xl opacity-8 text-purple-400">🥁</div>
          <div class="absolute bottom-1/3 left-16 text-3xl opacity-8 text-green-400">🎵</div>
          
          <div class="text-center mb-12 relative z-10">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">私たちの活動</h3>
            <div class="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 musical-hover">
              <div class="text-center mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">指導者育成</h4>
              </div>
              <p class="text-gray-600 text-sm">講師の人材情報管理と指導者の育成事業を行っています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 musical-hover">
              <div class="text-center mb-4">
                <i class="fas fa-tools text-purple-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">楽器管理</h4>
              </div>
              <p class="text-gray-600 text-sm">楽器や楽譜の貸し出し等の備品管理事業を実施しています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 musical-hover">
              <div class="text-center mb-4">
                <i class="fas fa-calendar-alt text-green-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">演奏機会</h4>
              </div>
              <p class="text-gray-600 text-sm">地元企業や教育機関と協働する環境づくりを推進しています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 musical-hover">
              <div class="text-center mb-4">
                <i class="fas fa-yen-sign text-orange-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">資金調達</h4>
              </div>
              <p class="text-gray-600 text-sm">活動団体への公平かつ計画的な財政支援を行っています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 支援内容 */}
      <section id="support" class="py-16 bg-white bg-music-notes relative">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">支援を通じて実現したいこと</h3>
            <div class="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-child text-white text-2xl"></i>
              </div>
              <h4 class="text-lg font-semibold mb-3">子どもたちが好きな音楽を自由に楽しめる環境を</h4>
              <p class="text-gray-600">経済的支援により子どもの成長機会を支え、将来の活躍の可能性を広げます。</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-home text-white text-2xl"></i>
              </div>
              <h4 class="text-lg font-semibold mb-3">家庭・地域・企業を結ぶ橋渡しに</h4>
              <p class="text-gray-600">支援を通じて様々な立場の人々をつなぎ、コミュニティの絆を深めます。</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-map-marker-alt text-white text-2xl"></i>
              </div>
              <h4 class="text-lg font-semibold mb-3">音楽を通じて静岡の魅力をアップ</h4>
              <p class="text-gray-600">地域の音楽人材の活用による静岡の文化的発展と人材の定着を図ります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 理事長紹介 */}
      <section class="py-16 bg-gradient-to-r from-blue-100 to-purple-100 bg-staff-lines relative">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h3 class="text-3xl font-bold text-gray-800 mb-8">理事長からのメッセージ</h3>
            <div class="bg-white rounded-lg shadow-lg p-8 musical-hover">
              <div class="flex flex-col md:flex-row items-center mb-6">
                {/* 理事長写真の代替アイコン */}
                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  <i class="fas fa-user-tie text-white text-3xl"></i>
                </div>
                <div class="text-center md:text-left">
                  <h4 class="text-xl font-semibold text-gray-800 mb-2">北山敦康（きたやまあつやす）</h4>
                  <p class="text-gray-600 text-sm mb-2">静岡大学名誉教授</p>
                  <p class="text-gray-600 text-sm">NPO法人しずおか音楽文化支援協議会 理事長</p>
                </div>
              </div>
              <blockquote class="text-gray-700 italic text-lg leading-relaxed">
                「部活動の地域移行は、すべての子どもたちが将来にわたってスポーツや文化芸術等に親しむことができる平等な体験機会を確保するとともに、地域文化の持続可能性や地域社会の安定的な発展に欠かすことのできない課題となっています。私たちの活動の趣旨にご賛同いただければ幸いです。」
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* すみやグッディとの連携 */}
      <section class="py-16 bg-white bg-sound-waves relative">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">協力企業</h3>
            <div class="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          </div>
          
          <div class="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center musical-hover">
            <div class="mb-6">
              <i class="fas fa-handshake text-green-600 text-4xl mb-4"></i>
              <h4 class="text-2xl font-semibold text-gray-800 mb-4">すみやグッディ</h4>
            </div>
            <p class="text-gray-700 mb-6">
              静岡県で70年続く総合楽器店「すみやグッディ」様とパートナーシップを組み、<br />
              楽器の提供・管理、音楽教育の専門知識、地域ネットワークを活用して<br />
              子どもたちの音楽活動を支援しています。
            </p>
            <a href="https://sumiya-goody.co.jp/" target="_blank" rel="noopener" class="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
              <i class="fas fa-external-link-alt mr-2"></i>
              すみやグッディの詳細を見る
            </a>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" class="py-16 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold mb-4">お問い合わせ・ご支援</h3>
            <div class="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p class="text-lg opacity-90">
              私たちの活動にご興味をお持ちいただき、ありがとうございます。<br />
              お気軽にお問い合わせください。
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div class="bg-gray-800 p-6 rounded-lg">
              <h4 class="text-xl font-semibold mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-blue-400"></i>
                活動について知りたい方
              </h4>
              <p class="text-gray-300 mb-4">
                部活動の地域移行や私たちの取り組みについて詳しく知りたい方は、こちらからお問い合わせください。
              </p>
              <a href="mailto:info@shizuoka-musicsupport.jp" class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                <i class="fas fa-envelope mr-2"></i>
                メールで問い合わせ
              </a>
            </div>
            
            <div class="bg-gray-800 p-6 rounded-lg">
              <h4 class="text-xl font-semibold mb-4 flex items-center">
                <i class="fas fa-heart mr-2 text-red-400"></i>
                ご支援をお考えの方
              </h4>
              <p class="text-gray-300 mb-4">
                企業様、個人の皆様からのご支援を心よりお待ちしております。一緒に子どもたちの未来を支えませんか？
              </p>
              <a href="mailto:support@shizuoka-musicsupport.jp" class="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                <i class="fas fa-hand-holding-heart mr-2"></i>
                支援について相談
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

// ニュース・お知らせページ
app.get('/news', (c) => {
  return c.render(
    <div>
      <Navigation />
      
      {/* ページヘッダー */}
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">{newsConfig.title}</h1>
          <p class="text-xl opacity-90">{newsConfig.description}</p>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto space-y-8">
            
            {newsConfig.articles.map((article) => (
              <article class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
                <div class="md:flex">
                  <div class="md:w-1/3">
                    {article.image.startsWith('gradient-') ? (
                      <div class={`w-full h-48 md:h-full bg-gradient-to-br ${
                        article.image === 'gradient-blue' ? 'from-blue-400 to-cyan-500' :
                        article.image === 'gradient-green' ? 'from-green-400 to-blue-500' :
                        article.image === 'gradient-purple' ? 'from-purple-400 to-pink-500' :
                        article.image === 'gradient-yellow' ? 'from-yellow-400 to-orange-500' :
                        article.image === 'gradient-orange' ? 'from-orange-400 to-red-500' :
                        'from-gray-400 to-gray-500'
                      } flex items-center justify-center`}>
                        <i class={`fas ${
                          article.category === '受賞' ? 'fa-trophy' :
                          article.category === 'イベント' ? 'fa-calendar-alt' :
                          article.category === '募集' ? 'fa-users' :
                          'fa-info-circle'
                        } text-white text-4xl`}></i>
                      </div>
                    ) : (
                      <img 
                        src={article.image}
                        alt={article.title}
                        class="w-full h-48 md:h-full object-cover"
                      />
                    )}
                  </div>
                  <div class="md:w-2/3 p-6">
                    <div class="flex items-center mb-3">
                      <span class={`bg-${article.categoryColor}-100 text-${article.categoryColor}-800 text-xs px-2 py-1 rounded-full mr-2`}>
                        {article.category}
                      </span>
                      <time class="text-gray-500 text-sm">{article.date}</time>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-3">{article.title}</h2>
                    <p class="text-gray-600 mb-4">{article.excerpt}</p>
                    <a href={article.link} class="text-blue-600 hover:text-blue-800 font-semibold">続きを読む →</a>
                  </div>
                </div>
              </article>
            ))}

          </div>

          {/* ページネーション */}
          <div class="mt-12 flex justify-center">
            <nav class="flex space-x-2">
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">2</button>
              <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">3</button>
              <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">→</button>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

// 活動詳細ページ
app.get('/programs', (c) => {
  return c.render(
    <div>
      <Navigation />
      
      {/* ページヘッダー */}
      <section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">活動詳細・プログラム</h1>
          <p class="text-xl opacity-90">私たちの支援プログラムをご紹介します</p>
        </div>
      </section>

      {/* プログラム詳細 */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">

            {/* 指導者育成プログラム */}
            <div class="mb-16">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 class="text-3xl font-bold text-gray-800 mb-6">指導者育成プログラム</h2>
                  <div class="space-y-4 text-gray-600">
                    <p>経験豊富な音楽家や教育者による講師の人材育成を行っています。</p>
                    <ul class="space-y-2">
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>専門技術指導研修</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>教育法ワークショップ</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>定期的なスキルアップ研修</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>講師認定制度</li>
                    </ul>
                    <div class="bg-blue-50 p-4 rounded-lg mt-6">
                      <p class="text-sm text-blue-800"><strong>対象：</strong> 音楽教育経験者、プロ音楽家、元教員など</p>
                    </div>
                  </div>
                </div>
                <div class="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 text-center text-white">
                  <i class="fas fa-chalkboard-teacher text-6xl mb-4"></i>
                  <h3 class="text-xl font-semibold mb-2">年間研修回数</h3>
                  <p class="text-3xl font-bold">24回</p>
                </div>
              </div>
            </div>

            {/* 楽器貸出プログラム */}
            <div class="mb-16 bg-gray-50 p-8 rounded-lg">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-8 text-center text-white">
                  <i class="fas fa-tools text-6xl mb-4"></i>
                  <h3 class="text-xl font-semibold mb-2">管理楽器数</h3>
                  <p class="text-3xl font-bold">150台</p>
                </div>
                <div>
                  <h2 class="text-3xl font-bold text-gray-800 mb-6">楽器貸出・管理プログラム</h2>
                  <div class="space-y-4 text-gray-600">
                    <p>経済的負担を軽減し、すべての子どもたちに楽器を提供します。</p>
                    <ul class="space-y-2">
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>無料楽器貸出制度</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>定期メンテナンス</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>楽譜・教材の提供</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>修理・調整サービス</li>
                    </ul>
                    <div class="bg-green-50 p-4 rounded-lg mt-6">
                      <p class="text-sm text-green-800"><strong>対象楽器：</strong> 管楽器全般、打楽器、その他吹奏楽楽器</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 演奏機会創出プログラム */}
            <div class="mb-16">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 class="text-3xl font-bold text-gray-800 mb-6">演奏機会創出プログラム</h2>
                  <div class="space-y-4 text-gray-600">
                    <p>地域企業や教育機関と協働し、子どもたちの発表の場を作ります。</p>
                    <ul class="space-y-2">
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>定期合同演奏会</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>地域イベント参加</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>企業コラボ企画</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>音楽祭・コンクール</li>
                    </ul>
                    <div class="bg-purple-50 p-4 rounded-lg mt-6">
                      <p class="text-sm text-purple-800"><strong>年間目標：</strong> 各校最低3回以上の演奏機会を提供</p>
                    </div>
                  </div>
                </div>
                <div class="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-8 text-center text-white">
                  <i class="fas fa-calendar-alt text-6xl mb-4"></i>
                  <h3 class="text-xl font-semibold mb-2">年間イベント数</h3>
                  <p class="text-3xl font-bold">15回</p>
                </div>
              </div>
            </div>

            {/* 財政支援プログラム */}
            <div class="bg-gray-50 p-8 rounded-lg">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-8 text-center text-white">
                  <i class="fas fa-yen-sign text-6xl mb-4"></i>
                  <h3 class="text-xl font-semibold mb-2">年間支援額</h3>
                  <p class="text-3xl font-bold">500万円</p>
                </div>
                <div>
                  <h2 class="text-3xl font-bold text-gray-800 mb-6">財政支援プログラム</h2>
                  <div class="space-y-4 text-gray-600">
                    <p>活動団体への公平かつ計画的な財政支援を実施します。</p>
                    <ul class="space-y-2">
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>活動費補助金</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>楽器購入支援</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>講師謝礼補助</li>
                      <li class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>会場使用料支援</li>
                    </ul>
                    <div class="bg-orange-50 p-4 rounded-lg mt-6">
                      <p class="text-sm text-orange-800"><strong>支援基準：</strong> 活動規模・参加人数・地域貢献度を総合評価</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

// イベント情報ページ
app.get('/events', (c) => {
  return c.render(
    <div>
      <Navigation />
      
      {/* ページヘッダー */}
      <section class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">イベント・演奏会</h1>
          <p class="text-xl opacity-90">音楽で繋がる、素敵なイベントをご紹介</p>
        </div>
      </section>

      {/* 今後の予定 */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">今後の予定</h2>
          
          <div class="max-w-4xl mx-auto space-y-6">
            
            {/* イベント1 */}
            <div class="bg-white border-l-4 border-blue-500 rounded-lg shadow-lg p-6 musical-hover">
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-3">演奏会</span>
                    <time class="text-gray-500 font-semibold">2024年10月28日（土）</time>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">第1回合同演奏会</h3>
                  <p class="text-gray-600 mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    グランシップ中ホール・大地
                  </p>
                  <p class="text-gray-600">
                    参加校5校による合同演奏会。中学生たちの1年間の成長をお聞きください。
                  </p>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">入場無料</span>
                </div>
              </div>
            </div>

            {/* イベント2 */}
            <div class="bg-white border-l-4 border-purple-500 rounded-lg shadow-lg p-6 musical-hover">
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-3">ワークショップ</span>
                    <time class="text-gray-500 font-semibold">2024年11月15日（日）</time>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">楽器体験ワークショップ</h3>
                  <p class="text-gray-600 mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    すみやグッディ本店
                  </p>
                  <p class="text-gray-600">
                    小学生・保護者向けの楽器体験イベント。将来の部活動選択の参考に。
                  </p>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6">
                  <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">要予約</span>
                </div>
              </div>
            </div>

            {/* イベント3 */}
            <div class="bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-6 musical-hover">
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-3">コンサート</span>
                    <time class="text-gray-500 font-semibold">2024年12月22日（日）</time>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">クリスマスコンサート</h3>
                  <p class="text-gray-600 mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    静岡市民文化会館
                  </p>
                  <p class="text-gray-600">
                    プロの講師陣と中学生によるクリスマスの特別コンサート。
                  </p>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6">
                  <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">チケット制</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 過去の実績 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">過去のイベント実績</h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* 実績1 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <i class="fas fa-music text-white text-4xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">春の音楽祭 2024</h3>
                <p class="text-gray-600 text-sm mb-3">2024年3月20日 開催</p>
                <p class="text-gray-600 text-sm">参加者約200名、観客約500名の大成功イベント</p>
              </div>
            </div>

            {/* 実績2 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <div class="h-48 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                <i class="fas fa-trophy text-white text-4xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">県大会入賞</h3>
                <p class="text-gray-600 text-sm mb-3">2024年2月10日</p>
                <p class="text-gray-600 text-sm">参加校3校が静岡県中学校音楽コンクールで入賞</p>
              </div>
            </div>

            {/* 実績3 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden musical-hover">
              <div class="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <i class="fas fa-heart text-white text-4xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">チャリティーコンサート</h3>
                <p class="text-gray-600 text-sm mb-3">2023年12月25日</p>
                <p class="text-gray-600 text-sm">売上の一部を地域の音楽活動支援に寄付</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

// 講師紹介ページ
app.get('/staff', (c) => {
  return c.render(
    <div>
      <Navigation />
      
      {/* ページヘッダー */}
      <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">講師・スタッフ紹介</h1>
          <p class="text-xl opacity-90">経験豊富な指導陣をご紹介します</p>
        </div>
      </section>

      {/* 講師一覧 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          
          {/* 理事長 */}
          <div class="max-w-4xl mx-auto mb-16">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">理事長</h2>
            <div class="bg-white rounded-lg shadow-lg p-8">
              <div class="flex flex-col md:flex-row items-center">
                <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                  <i class="fas fa-user-tie text-white text-4xl"></i>
                </div>
                <div class="flex-1 text-center md:text-left">
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">北山敦康（きたやまあつやす）</h3>
                  <p class="text-blue-600 font-semibold mb-4">静岡大学名誉教授 / NPO法人理事長</p>
                  <div class="text-gray-600 space-y-2">
                    <p>• 1977年 国立音楽大学大学院修士課程修了</p>
                    <p>• 1982年〜2018年 静岡大学教育学部勤務</p>
                    <p>• 2022年 文化庁「文化部活動の地域移行に関する検討会議」座長</p>
                    <p>• 2023年 「令和５年度文化庁長官表彰」受彰</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 専門講師陣 */}
          <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">専門講師陣</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* 講師1 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-music text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">田中 美和子</h3>
                <p class="text-blue-600 text-sm mb-3">フルート / 木管楽器専門</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>東京音楽大学卒業</p>
                  <p>元NHK交響楽団団員</p>
                  <p>指導歴15年</p>
                </div>
              </div>

              {/* 講師2 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-drum text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">佐藤 健太郎</h3>
                <p class="text-green-600 text-sm mb-3">打楽器 / リズムセクション</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>国立音楽大学卒業</p>
                  <p>プロオーケストラ経験</p>
                  <p>指導歴12年</p>
                </div>
              </div>

              {/* 講師3 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-wind text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">鈴木 雅人</h3>
                <p class="text-purple-600 text-sm mb-3">トランペット / 金管楽器</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>武蔵野音楽大学卒業</p>
                  <p>元自衛隊音楽隊</p>
                  <p>指導歴20年</p>
                </div>
              </div>

              {/* 講師4 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-saxophone-alt text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">山田 愛子</h3>
                <p class="text-orange-600 text-sm mb-3">サックス / 木管アンサンブル</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>桐朋学園大学卒業</p>
                  <p>ジャズ・クラシック両対応</p>
                  <p>指導歴10年</p>
                </div>
              </div>

              {/* 講師5 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-hand-conductor text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">高橋 俊介</h3>
                <p class="text-indigo-600 text-sm mb-3">指揮 / アンサンブル指導</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>東京芸術大学卒業</p>
                  <p>元中学校音楽教員</p>
                  <p>指導歴25年</p>
                </div>
              </div>

              {/* 講師6 */}
              <div class="bg-white rounded-lg shadow-lg p-6 text-center musical-hover">
                <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-book-music text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">小林 礼子</h3>
                <p class="text-pink-600 text-sm mb-3">音楽理論 / ソルフェージュ</p>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>静岡大学教育学部卒業</p>
                  <p>元高校音楽教員</p>
                  <p>指導歴18年</p>
                </div>
              </div>

            </div>
          </div>

          {/* 講師募集 */}
          <div class="max-w-4xl mx-auto mt-16">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">講師を募集しています</h2>
              <p class="text-gray-600 mb-6">音楽教育の経験がある方、子どもたちの成長を一緒に支援してくださる方を募集中です。</p>
              <div class="space-y-2 text-gray-600 mb-6">
                <p>• 音楽大学卒業または同等の音楽経験</p>
                <p>• 楽器指導経験（プロ・アマ問わず）</p>
                <p>• 子どもたちへの教育熱意</p>
              </div>
              <a href="mailto:recruit@shizuoka-musicsupport.jp" class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center">
                <i class="fas fa-envelope mr-2"></i>
                お問い合わせ
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
})

// Q&Aページ
app.get('/faq', (c) => {
  return c.render(
    <div>
      <Navigation />
      
      {/* ページヘッダー */}
      <section class="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">よくある質問（Q&A）</h1>
          <p class="text-xl opacity-90">皆様からよくいただく質問にお答えします</p>
        </div>
      </section>

      {/* Q&A */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto space-y-6">

            {/* Q1 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-blue-50 p-6 border-l-4 border-blue-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  参加に費用はかかりますか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>基本的な参加費用は無料です。ただし、以下の場合は実費負担をお願いすることがあります：</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>楽器の修理費（故意による破損の場合）</li>
                      <li>演奏会の衣装代（希望者のみ）</li>
                      <li>遠征費の交通費（参加校で分担）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-purple-50 p-6 border-l-4 border-purple-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  楽器を持っていないのですが大丈夫ですか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>はい、全く問題ありません！当協議会では楽器の無料貸出制度を実施しています。</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>管楽器全般（トランペット、サックス、クラリネットなど）</li>
                      <li>打楽器類</li>
                      <li>定期的なメンテナンス付き</li>
                      <li>楽譜や教材も提供</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-green-50 p-6 border-l-4 border-green-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  初心者でも参加できますか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>もちろんです！初心者大歓迎です。経験豊富な講師陣が基礎から丁寧に指導します。</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>楽器の持ち方から指導</li>
                      <li>音楽理論の基礎学習</li>
                      <li>個人のペースに合わせた指導</li>
                      <li>経験者との交流によるスキルアップ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-orange-50 p-6 border-l-4 border-orange-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  練習はどこで行いますか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>主に参加校の音楽室や地域の公共施設を利用します。</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>平日：各中学校の音楽室</li>
                      <li>土日：地域の文化会館、公民館など</li>
                      <li>合同練習：グランシップなどの大型施設</li>
                      <li>すみやグッディ店舗の練習室（一部利用可能）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-red-50 p-6 border-l-4 border-red-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  学校の部活動との違いは何ですか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>地域移行による新しい形の音楽活動です。</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>専門講師による本格指導</li>
                      <li>複数校の生徒との交流機会</li>
                      <li>より多くの演奏会・発表の場</li>
                      <li>経済的負担の軽減</li>
                      <li>地域全体での音楽文化向上</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-indigo-50 p-6 border-l-4 border-indigo-500">
                <h3 class="text-lg font-bold text-gray-800 flex items-center">
                  <span class="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">Q</span>
                  参加申し込みはどうすればいいですか？
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-start">
                  <span class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1">A</span>
                  <div class="text-gray-600">
                    <p>以下の方法でお申し込みいただけます：</p>
                    <ul class="mt-2 ml-4 space-y-1 list-disc">
                      <li>メール：info@shizuoka-musicsupport.jp</li>
                      <li>各中学校の音楽担当教員経由</li>
                      <li>すみやグッディ店舗での相談</li>
                      <li>当協議会への直接お問い合わせ</li>
                    </ul>
                    <p class="mt-2">まずはお気軽にご相談ください！</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* お問い合わせCTA */}
          <div class="max-w-4xl mx-auto mt-16">
            <div class="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-8 text-center">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">他にご質問がございますか？</h2>
              <p class="text-gray-600 mb-6">上記以外のご質問やご不明な点がございましたら、お気軽にお問い合わせください。</p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:info@shizuoka-musicsupport.jp" class="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors inline-flex items-center">
                  <i class="fas fa-envelope mr-2"></i>
                  メールで問い合わせ
                </a>
                <a href="tel:054-123-4567" class="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors inline-flex items-center">
                  <i class="fas fa-phone mr-2"></i>
                  電話で問い合わせ
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
})

// お問い合わせAPI（将来的に使用）
app.post('/api/contact', async (c) => {
  try {
    const formData = await c.req.json()
    
    // ここで実際のメール送信処理を行う（将来的に実装）
    // 現在はログ出力のみ
    console.log('Contact form submitted:', formData)
    
    return c.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました。後日ご連絡いたします。' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ 
      success: false, 
      message: 'エラーが発生しました。直接メールでお問い合わせください。' 
    }, 500)
  }
})

// 🔧 シンプルな管理システムを統合
app.route('/admin', adminApp)

// 📝 簡単な編集ガイドページ（管理者専用・秘密のURL）
app.get('/npo-admin-edit-guide-2025', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>サイト編集ガイド - しずおか音楽文化支援協議会</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body { font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', sans-serif; }
          .code-block { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 1rem; font-family: monospace; overflow-x: auto; }
        </style>
    </head>
    <body class="bg-gray-100">
        <!-- ヘッダー -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-6xl mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <i class="fas fa-music text-indigo-600 text-2xl mr-3"></i>
                        <h1 class="text-xl font-semibold text-gray-900">サイト編集ガイド</h1>
                    </div>
                    <a href="/" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-arrow-left mr-1"></i>
                        サイトに戻る
                    </a>
                </div>
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-4 py-8">
            
            <!-- 概要 -->
            <div class="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-blue-900 mb-4">
                    <i class="fas fa-info-circle mr-2"></i>
                    サイト編集について
                </h2>
                <p class="text-blue-800 mb-4">
                    このサイトのコンテンツは<strong>設定ファイル</strong>を編集することで変更できます。<br>
                    技術的な知識は必要ありませんが、慎重に行うことをお勧めします。
                </p>
                <div class="bg-white rounded p-4">
                    <h3 class="font-semibold text-blue-900 mb-2">現在のサイト情報</h3>
                    <ul class="text-sm text-blue-800 space-y-1">
                        <li><i class="fas fa-bullhorn text-blue-600 mr-2"></i>お知らせ: ${siteConfig.news.length}件</li>
                        <li><i class="fas fa-calendar text-green-600 mr-2"></i>イベント: ${siteConfig.events.length}件</li>
                        <li><i class="fas fa-question-circle text-orange-600 mr-2"></i>FAQ: ${siteConfig.faq.length}件</li>
                        <li><i class="fas fa-users text-purple-600 mr-2"></i>スタッフ: ${siteConfig.staff.length}名</li>
                    </ul>
                </div>
            </div>

            <!-- 編集方法 -->
            <div class="space-y-6">
                
                <!-- 管理者向け案内 -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-600 mr-3"></i>
                        ⚠️ 管理者専用ページ
                    </h3>
                    <p class="text-red-800 mb-4">
                        このページは<strong>NPO法人スタッフ専用</strong>です。<br>
                        サイト編集は技術担当者にご依頼ください。
                    </p>
                    <div class="bg-white border border-red-200 rounded p-4">
                        <h4 class="font-semibold text-red-900 mb-2">編集をご希望の場合：</h4>
                        <ul class="text-sm text-red-800 space-y-1">
                            <li>• お知らせの追加・変更</li>
                            <li>• イベント情報の更新</li>
                            <li>• スタッフ情報の変更</li>
                            <li>• その他コンテンツの修正</li>
                        </ul>
                        <p class="mt-3 text-sm">
                            <strong>連絡先:</strong> 
                            <a href="mailto:tech-support@shizuoka-musicsupport.jp" class="text-red-600 hover:text-red-800 underline">
                                tech-support@shizuoka-musicsupport.jp
                            </a>
                        </p>
                    </div>
                </div>

                <!-- 方法1: config.ts編集 -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-file-code text-blue-600 mr-3"></i>
                        編集方法: config.ts ファイル編集
                    </h3>
                    <div class="space-y-4 text-gray-700">
                        <p>すべてのコンテンツは <code class="bg-gray-100 px-2 py-1 rounded font-mono">src/config.ts</code> ファイルに集約されています。</p>
                        
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold mb-2">編集可能な項目例:</h4>
                            <div class="code-block text-sm">
// サイトの基本情報<br>
siteName: "しずおか音楽文化支援協議会", // ← この部分を編集<br>
<br>
// お知らせの追加<br>
news: [<br>
&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;title: "新しいお知らせ", // ← タイトルを編集<br>
&nbsp;&nbsp;&nbsp;&nbsp;content: "内容をここに書く" // ← 内容を編集<br>
&nbsp;&nbsp;}<br>
]
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 編集できる項目 -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-edit text-gray-800 mr-3"></i>
                        編集できる項目
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div class="space-y-2">
                            <h4 class="font-semibold text-blue-600">基本情報</h4>
                            <ul class="text-gray-600 space-y-1 ml-4">
                                <li>• サイトタイトル</li>
                                <li>• メインメッセージ</li>
                                <li>• ボタンテキスト</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-semibold text-green-600">コンテンツ</h4>
                            <ul class="text-gray-600 space-y-1 ml-4">
                                <li>• お知らせの追加・編集</li>
                                <li>• イベント情報</li>
                                <li>• FAQ項目</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-semibold text-purple-600">スタッフ情報</h4>
                            <ul class="text-gray-600 space-y-1 ml-4">
                                <li>• 講師・スタッフ紹介</li>
                                <li>• プロフィール</li>
                                <li>• 担当楽器</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-semibible text-orange-600">その他</h4>
                            <ul class="text-gray-600 space-y-1 ml-4">
                                <li>• 連絡先情報</li>
                                <li>• 活動内容</li>
                                <li>• 協力企業情報</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 注意事項 -->
                <div class="bg-yellow-50 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
                        編集時の注意事項
                    </h3>
                    <ul class="text-yellow-800 space-y-2">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-yellow-600 mr-2 mt-1"></i>
                            <span>日本語の部分のみを編集してください</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-yellow-600 mr-2 mt-1"></i>
                            <span>コロン（:）やカンマ（,）などの記号は削除しないでください</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-yellow-600 mr-2 mt-1"></i>
                            <span>編集前にバックアップを作成することをお勧めします</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-yellow-600 mr-2 mt-1"></i>
                            <span>不明な点は技術担当者にお尋ねください</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </body>
    </html>
  `);
});

// 404ハンドリング
app.notFound((c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">ページが見つかりません</h2>
        <p class="text-gray-500 mb-8">お探しのページは存在しないか、移動された可能性があります。</p>
        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
          <i class="fas fa-home mr-2"></i>
          ホームに戻る
        </a>
      </div>
    </div>
  )
})

export default app

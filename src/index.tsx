import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// CORS設定
app.use('/api/*', cors())

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }))

// レンダラー設定
app.use(renderer)

// メインページ
app.get('/', (c) => {
  return c.render(
    <div>
      {/* ヘッダー */}
      <header class="bg-white shadow-lg sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fas fa-music text-blue-600 text-2xl"></i>
              <div>
                <h1 class="text-xl font-bold text-gray-800">しずおか音楽文化支援協議会</h1>
                <p class="text-xs text-gray-600">NPO法人</p>
              </div>
            </div>
            <div class="hidden md:flex space-x-6">
              <a href="#about" class="text-gray-600 hover:text-blue-600 transition-colors">協議会について</a>
              <a href="#activities" class="text-gray-600 hover:text-blue-600 transition-colors">活動内容</a>
              <a href="#support" class="text-gray-600 hover:text-blue-600 transition-colors">支援内容</a>
              <a href="#contact" class="text-gray-600 hover:text-blue-600 transition-colors">お問い合わせ</a>
            </div>
          </div>
        </nav>
      </header>

      {/* ヒーローセクション */}
      <section class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="relative container mx-auto px-4 text-center">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-bold mb-6">
              音楽で成長する子どもたちとともに<br />
              <span class="text-yellow-300">地域のつながりを創出</span>
            </h2>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
              中学生の吹奏楽部活動を地域みんなで支えよう
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#activities" class="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 inline-flex items-center">
                <i class="fas fa-play mr-2"></i>
                活動を見る
              </a>
              <a href="#contact" class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all inline-flex items-center">
                <i class="fas fa-envelope mr-2"></i>
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
        
        {/* 装飾的な音符 */}
        <div class="absolute top-20 left-10 text-6xl opacity-20">♪</div>
        <div class="absolute bottom-20 right-10 text-4xl opacity-20">♫</div>
        <div class="absolute top-1/2 left-1/4 text-3xl opacity-20">♬</div>
      </section>

      {/* 協議会について */}
      <section id="about" class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">私たちについて</h3>
            <div class="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              国の政策である「公立中学校部活動の地域移行」を見据え、<br />
              これまで学校教育の一環として行われてきた吹奏楽部の活動を、<br />
              地域の皆様との連携・協働によって持続可能な形で維持することを目指しています。
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-users text-white text-2xl"></i>
              </div>
              <h4 class="text-xl font-semibold mb-3">地域連携</h4>
              <p class="text-gray-600">学校・家庭・地域・企業をつなぐ橋渡し役として、みんなで子どもたちの成長を支えます。</p>
            </div>
            
            <div class="text-center p-6 rounded-lg bg-purple-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <h4 class="text-xl font-semibold mb-3">教育支援</h4>
              <p class="text-gray-600">教職員の働きやすさへの貢献による教育環境の向上を目指します。</p>
            </div>
            
            <div class="text-center p-6 rounded-lg bg-pink-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-heart text-white text-2xl"></i>
              </div>
              <h4 class="text-xl font-semibold mb-3">平等な機会</h4>
              <p class="text-gray-600">経済的要因による子どもたちの体験格差を解消し、すべての子に音楽の機会を。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 活動内容 */}
      <section id="activities" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">私たちの活動</h3>
            <div class="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="text-center mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">指導者育成</h4>
              </div>
              <p class="text-gray-600 text-sm">講師の人材情報管理と指導者の育成事業を行っています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="text-center mb-4">
                <i class="fas fa-tools text-purple-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">楽器管理</h4>
              </div>
              <p class="text-gray-600 text-sm">楽器や楽譜の貸し出し等の備品管理事業を実施しています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="text-center mb-4">
                <i class="fas fa-calendar-alt text-green-600 text-3xl mb-3"></i>
                <h4 class="font-semibold text-lg">演奏機会</h4>
              </div>
              <p class="text-gray-600 text-sm">地元企業や教育機関と協働する環境づくりを推進しています。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
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
      <section id="support" class="py-16 bg-white">
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
      <section class="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h3 class="text-3xl font-bold text-gray-800 mb-8">理事長からのメッセージ</h3>
            <div class="bg-white rounded-lg shadow-lg p-8">
              <div class="mb-6">
                <h4 class="text-xl font-semibold text-gray-800 mb-2">北山敦康（きたやまあつやす）</h4>
                <p class="text-gray-600 text-sm mb-4">静岡大学名誉教授 / NPO法人しずおか音楽文化支援協議会 理事長</p>
              </div>
              <blockquote class="text-gray-700 italic text-lg leading-relaxed">
                「部活動の地域移行は、すべての子どもたちが将来にわたってスポーツや文化芸術等に親しむことができる平等な体験機会を確保するとともに、地域文化の持続可能性や地域社会の安定的な発展に欠かすことのできない課題となっています。私たちの活動の趣旨にご賛同いただければ幸いです。」
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* すみやグッディとの連携 */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">協力企業</h3>
            <div class="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          </div>
          
          <div class="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
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

      {/* フッター */}
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
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 特定非営利活動法人しずおか音楽文化支援協議会. All rights reserved.</p>
            <p class="mt-2">※本サイトは非営利目的で運営されています（Google Ad Grants対応）</p>
          </div>
        </div>
      </footer>
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

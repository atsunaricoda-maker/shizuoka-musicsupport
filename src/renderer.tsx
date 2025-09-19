import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>しずおか音楽文化支援協議会 - 中学生の音楽活動をみんなで支えよう</title>
        <meta name="description" content="静岡県の中学生の吹奏楽部活動を地域ぐるみで支援する特定非営利活動法人です。音楽で成長する子どもたちとともに、地域のつながりを創出します。" />
        <meta name="keywords" content="しずおか音楽文化支援協議会,NPO,吹奏楽,中学生,部活動,地域移行,静岡,音楽教育" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="しずおか音楽文化支援協議会 - 中学生の音楽活動をみんなで支えよう" />
        <meta property="og:description" content="静岡県の中学生の吹奏楽部活動を地域ぐるみで支援するNPO法人です。" />
        <meta property="og:type" content="website" />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=M+PLUS+1p:wght@400;500;700&display=swap" rel="stylesheet" />
        
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="font-sans text-gray-800 bg-musical-theme bg-music-notes bg-staff-lines">{children}</body>
    </html>
  )
})

// 🎵 しずおか音楽文化支援協議会 サイト設定ファイル
// ========================================
// このファイルを編集するだけで、サイト全体の内容を変更できます！
// 日本語で自由に編集してください。

export const siteConfig = {
  // 基本情報
  siteName: "しずおか音楽文化支援協議会",
  siteDescription: "静岡県の中学生の吹奏楽部活動を地域ぐるみで支援する特定非営利活動法人です。音楽で成長する子どもたちとともに、地域のつながりを創出します。",
  
  // メインメッセージ
  hero: {
    title: "音楽で成長する子どもたちとともに",
    subtitle: "地域のつながりを創出",
    description: "中学生の吹奏楽部活動を地域みんなで支えよう",
    buttons: {
      primary: "活動を見る",
      secondary: "お問い合わせ"
    }
  },

  // 協議会について
  about: {
    title: "私たちについて",
    description: "国の政策である「公立中学校部活動の地域移行」を見据え、これまで学校教育の一環として行われてきた吹奏楽部の活動を、地域の皆様との連携・協働によって持続可能な形で維持することを目指しています。",
    features: [
      {
        icon: "fas fa-users",
        title: "地域連携", 
        description: "学校・家庭・地域・企業をつなぐ橋渡し役として、みんなで子どもたちの成長を支えます。"
      },
      {
        icon: "fas fa-graduation-cap",
        title: "教育支援",
        description: "教職員の働きやすさへの貢献による教育環境の向上を目指します。"
      },
      {
        icon: "fas fa-heart",
        title: "平等な機会",
        description: "経済的要因による子どもたちの体験格差を解消し、すべての子に音楽の機会を。"
      }
    ]
  },

  // 活動内容
  activities: {
    title: "私たちの活動",
    items: [
      {
        icon: "fas fa-chalkboard-teacher",
        color: "blue-600",
        title: "指導者育成",
        description: "講師の人材情報管理と指導者の育成事業を行っています。"
      },
      {
        icon: "fas fa-tools", 
        color: "purple-600",
        title: "楽器管理",
        description: "楽器や楽譜の貸し出し等の備品管理事業を実施しています。"
      },
      {
        icon: "fas fa-calendar-alt",
        color: "green-600", 
        title: "演奏機会",
        description: "地元企業や教育機関と協働する環境づくりを推進しています。"
      },
      {
        icon: "fas fa-yen-sign",
        color: "orange-600",
        title: "資金調達", 
        description: "活動団体への公平かつ計画的な財政支援を行っています。"
      }
    ]
  },

  // 理事長情報
  president: {
    name: "北山敦康",
    nameKana: "きたやまあつやす",
    title: "静岡大学名誉教授 / NPO法人しずおか音楽文化支援協議会 理事長",
    message: "部活動の地域移行は、すべての子どもたちが将来にわたってスポーツや文化芸術等に親しむことができる平等な体験機会を確保するとともに、地域文化の持続可能性や地域社会の安定的な発展に欠かすことのできない課題となっています。私たちの活動の趣旨にご賛同いただければ幸いです。",
    profile: [
      "1977年 国立音楽大学大学院修士課程修了",
      "1982年〜2018年 静岡大学教育学部勤務", 
      "2022年 文化庁「文化部活動の地域移行に関する検討会議」座長",
      "2023年 「令和５年度文化庁長官表彰」受彰"
    ]
  },

  // すみやグッディ連携
  partner: {
    name: "すみやグッディ",
    description: "静岡県で70年続く総合楽器店「すみやグッディ」様とパートナーシップを組み、楽器の提供・管理、音楽教育の専門知識、地域ネットワークを活用して子どもたちの音楽活動を支援しています。",
    website: "https://sumiya-goody.co.jp/"
  },

  // お問い合わせ情報
  contact: {
    general: {
      title: "活動について知りたい方",
      description: "部活動の地域移行や私たちの取り組みについて詳しく知りたい方は、こちらからお問い合わせください。",
      email: "info@shizuoka-musicsupport.jp"
    },
    support: {
      title: "ご支援をお考えの方", 
      description: "企業様、個人の皆様からのご支援を心よりお待ちしております。一緒に子どもたちの未来を支えませんか？",
      email: "support@shizuoka-musicsupport.jp"
    },
    website: "https://www.shizuoka-musicsupport.jp",
    phone: "054-123-4567" // 実際の電話番号に変更してください
  }
}

// ニュース・お知らせ設定
export const newsConfig = {
  title: "ニュース・お知らせ",
  description: "最新の活動情報をお届けします",
  articles: [
    {
      id: "2024-program-start",
      category: "重要",
      categoryColor: "blue",
      date: "2024年9月19日",
      title: "2024年度 地域部活動支援プログラム開始！",
      excerpt: "新年度が始まり、いよいよ中学校部活動の地域移行支援プログラムが本格的にスタートしました。今年度は静岡市内の5校と連携し、約120名の中学生の音楽活動をサポートします。",
      image: "https://cdn1.genspark.ai/user-upload-image/3_generated/71afa1f7-9703-4583-bba8-d80e974055f0",
      link: "/news/2024-program-start"
    },
    {
      id: "education-award", 
      category: "受賞",
      categoryColor: "green",
      date: "2024年9月15日",
      title: "静岡県教育委員会から感謝状を受賞",
      excerpt: "当協議会の部活動地域移行への取り組みが評価され、静岡県教育委員会より感謝状をいただきました。これからもより一層、子どもたちの音楽活動を支援してまいります。",
      image: "gradient-green",
      link: "/news/education-award"
    },
    {
      id: "joint-concert",
      category: "イベント", 
      categoryColor: "purple",
      date: "2024年9月10日",
      title: "第1回合同演奏会 開催決定！",
      excerpt: "10月28日（土）にグランシップ中ホール・大地にて、参加校合同の演奏会を開催します。中学生たちの成長した演奏をぜひお聞きください。入場無料です。",
      image: "gradient-purple",
      link: "/events/joint-concert"
    },
    {
      id: "recruitment",
      category: "募集",
      categoryColor: "yellow", 
      date: "2024年9月5日",
      title: "新規参加校・講師を募集中",
      excerpt: "2025年度からのプログラム参加を希望する中学校、および指導にご協力いただける講師の方を募集しています。音楽教育の経験がある方、ぜひご連絡ください。",
      image: "gradient-yellow",
      link: "/news/recruitment"
    }
  ]
}

// イベント設定
export const eventsConfig = {
  title: "イベント・演奏会", 
  description: "音楽で繋がる、素敵なイベントをご紹介",
  upcoming: [
    {
      id: "joint-concert-2024",
      category: "演奏会",
      categoryColor: "blue",
      date: "2024年10月28日（土）",
      title: "第1回合同演奏会", 
      location: "グランシップ中ホール・大地",
      description: "参加校5校による合同演奏会。中学生たちの1年間の成長をお聞きください。",
      status: "入場無料",
      statusColor: "green"
    },
    {
      id: "instrument-workshop",
      category: "ワークショップ",
      categoryColor: "purple", 
      date: "2024年11月15日（日）",
      title: "楽器体験ワークショップ",
      location: "すみやグッディ本店",
      description: "小学生・保護者向けの楽器体験イベント。将来の部活動選択の参考に。",
      status: "要予約", 
      statusColor: "yellow"
    },
    {
      id: "christmas-concert",
      category: "コンサート",
      categoryColor: "green",
      date: "2024年12月22日（日）", 
      title: "クリスマスコンサート",
      location: "静岡市民文化会館",
      description: "プロの講師陣と中学生によるクリスマスの特別コンサート。",
      status: "チケット制",
      statusColor: "red"
    }
  ],
  past: [
    {
      title: "春の音楽祭 2024",
      date: "2024年3月20日 開催", 
      description: "参加者約200名、観客約500名の大成功イベント",
      image: "gradient-blue"
    },
    {
      title: "県大会入賞",
      date: "2024年2月10日",
      description: "参加校3校が静岡県中学校音楽コンクールで入賞", 
      image: "gradient-green"
    },
    {
      title: "チャリティーコンサート", 
      date: "2023年12月25日",
      description: "売上の一部を地域の音楽活動支援に寄付",
      image: "gradient-orange"
    }
  ]
}

// 講師・スタッフ設定
export const staffConfig = {
  title: "講師・スタッフ紹介",
  description: "経験豊富な指導陣をご紹介します",
  instructors: [
    {
      name: "田中 美和子",
      specialty: "フルート / 木管楽器専門",
      specialtyColor: "blue-600",
      background: ["東京音楽大学卒業", "元NHK交響楽団団員", "指導歴15年"],
      icon: "fas fa-music"
    },
    {
      name: "佐藤 健太郎", 
      specialty: "打楽器 / リズムセクション",
      specialtyColor: "green-600",
      background: ["国立音楽大学卒業", "プロオーケストラ経験", "指導歴12年"],
      icon: "fas fa-drum"
    },
    {
      name: "鈴木 雅人",
      specialty: "トランペット / 金管楽器", 
      specialtyColor: "purple-600",
      background: ["武蔵野音楽大学卒業", "元自衛隊音楽隊", "指導歴20年"],
      icon: "fas fa-wind"
    },
    {
      name: "山田 愛子",
      specialty: "サックス / 木管アンサンブル",
      specialtyColor: "orange-600", 
      background: ["桐朋学園大学卒業", "ジャズ・クラシック両対応", "指導歴10年"],
      icon: "fas fa-saxophone-alt"
    },
    {
      name: "高橋 俊介",
      specialty: "指揮 / アンサンブル指導",
      specialtyColor: "indigo-600",
      background: ["東京芸術大学卒業", "元中学校音楽教員", "指導歴25年"], 
      icon: "fas fa-hand-conductor"
    },
    {
      name: "小林 礼子",
      specialty: "音楽理論 / ソルフェージュ",
      specialtyColor: "pink-600",
      background: ["静岡大学教育学部卒業", "元高校音楽教員", "指導歴18年"],
      icon: "fas fa-book-music"
    }
  ],
  recruitment: {
    title: "講師を募集しています",
    description: "音楽教育の経験がある方、子どもたちの成長を一緒に支援してくださる方を募集中です。",
    requirements: [
      "音楽大学卒業または同等の音楽経験",
      "楽器指導経験（プロ・アマ問わず）", 
      "子どもたちへの教育熱意"
    ],
    email: "recruit@shizuoka-musicsupport.jp"
  }
}

// プログラム詳細設定
export const programsConfig = {
  title: "活動詳細・プログラム",
  description: "私たちの支援プログラムをご紹介します", 
  programs: [
    {
      id: "instructor-training",
      title: "指導者育成プログラム",
      description: "経験豊富な音楽家や教育者による講師の人材育成を行っています。",
      features: [
        "専門技術指導研修",
        "教育法ワークショップ", 
        "定期的なスキルアップ研修",
        "講師認定制度"
      ],
      target: "音楽教育経験者、プロ音楽家、元教員など",
      stats: {
        label: "年間研修回数",
        value: "24回"
      },
      icon: "fas fa-chalkboard-teacher",
      color: "blue"
    },
    {
      id: "instrument-lending",
      title: "楽器貸出・管理プログラム", 
      description: "経済的負担を軽減し、すべての子どもたちに楽器を提供します。",
      features: [
        "無料楽器貸出制度",
        "定期メンテナンス",
        "楽譜・教材の提供",
        "修理・調整サービス"
      ],
      target: "管楽器全般、打楽器、その他吹奏楽楽器",
      stats: {
        label: "管理楽器数", 
        value: "150台"
      },
      icon: "fas fa-tools",
      color: "green"
    },
    {
      id: "performance-opportunities",
      title: "演奏機会創出プログラム",
      description: "地域企業や教育機関と協働し、子どもたちの発表の場を作ります。",
      features: [
        "定期合同演奏会",
        "地域イベント参加", 
        "企業コラボ企画",
        "音楽祭・コンクール"
      ],
      target: "各校最低3回以上の演奏機会を提供",
      stats: {
        label: "年間イベント数",
        value: "15回"
      },
      icon: "fas fa-calendar-alt",
      color: "purple"
    },
    {
      id: "financial-support", 
      title: "財政支援プログラム",
      description: "活動団体への公平かつ計画的な財政支援を実施します。",
      features: [
        "活動費補助金",
        "楽器購入支援",
        "講師謝礼補助", 
        "会場使用料支援"
      ],
      target: "活動規模・参加人数・地域貢献度を総合評価",
      stats: {
        label: "年間支援額",
        value: "500万円"
      },
      icon: "fas fa-yen-sign",
      color: "orange"
    }
  ]
}

// FAQ設定
export const faqConfig = {
  title: "よくある質問（Q&A）",
  description: "皆様からよくいただく質問にお答えします",
  questions: [
    {
      question: "参加に費用はかかりますか？",
      answer: "基本的な参加費用は無料です。ただし、以下の場合は実費負担をお願いすることがあります：",
      details: [
        "楽器の修理費（故意による破損の場合）",
        "演奏会の衣装代（希望者のみ）",
        "遠征費の交通費（参加校で分担）"
      ]
    },
    {
      question: "楽器を持っていないのですが大丈夫ですか？",
      answer: "はい、全く問題ありません！当協議会では楽器の無料貸出制度を実施しています。",
      details: [
        "管楽器全般（トランペット、サックス、クラリネットなど）", 
        "打楽器類",
        "定期的なメンテナンス付き",
        "楽譜や教材も提供"
      ]
    },
    {
      question: "初心者でも参加できますか？",
      answer: "もちろんです！初心者大歓迎です。経験豊富な講師陣が基礎から丁寧に指導します。",
      details: [
        "楽器の持ち方から指導",
        "音楽理論の基礎学習",
        "個人のペースに合わせた指導", 
        "経験者との交流によるスキルアップ"
      ]
    },
    {
      question: "練習はどこで行いますか？",
      answer: "主に参加校の音楽室や地域の公共施設を利用します。",
      details: [
        "平日：各中学校の音楽室",
        "土日：地域の文化会館、公民館など",
        "合同練習：グランシップなどの大型施設",
        "すみやグッディ店舗の練習室（一部利用可能）"
      ]
    },
    {
      question: "学校の部活動との違いは何ですか？",
      answer: "地域移行による新しい形の音楽活動です。", 
      details: [
        "専門講師による本格指導",
        "複数校の生徒との交流機会",
        "より多くの演奏会・発表の場",
        "経済的負担の軽減",
        "地域全体での音楽文化向上"
      ]
    },
    {
      question: "参加申し込みはどうすればいいですか？",
      answer: "以下の方法でお申し込みいただけます：", 
      details: [
        "メール：info@shizuoka-musicsupport.jp",
        "各中学校の音楽担当教員経由",
        "すみやグッディ店舗での相談",
        "当協議会への直接お問い合わせ"
      ],
      note: "まずはお気軽にご相談ください！"
    }
  ]
}
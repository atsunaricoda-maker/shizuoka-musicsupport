// 🔐 管理画面用の型定義

export interface AdminBindings {
  ADMIN_CONTENT: KVNamespace;
}

export interface SiteContent {
  // 基本情報
  siteName: string;
  siteDescription: string;
  
  // メインメッセージ
  hero: {
    title: string;
    subtitle: string;
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  
  // お知らせ
  news: Array<{
    id: string;
    title: string;
    date: string;
    content: string;
    category: string;
  }>;
  
  // イベント
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    status: string;
  }>;
  
  // よくある質問
  faq: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
  }>;
  
  // スタッフ情報
  staff: Array<{
    id: string;
    name: string;
    role: string;
    speciality: string;
    description: string;
    experience: string;
  }>;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
  lastLogin: string;
}
// お問い合わせフォームのJavaScript処理

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const organization = formData.get('organization') || '（未記入）';
      const phone = formData.get('phone') || '（未記入）';
      const category = formData.get('category');
      const message = formData.get('message');
      
      // メール本文を作成
      const body = `しずおか音楽文化支援協議会 様

いつもお世話になっております。

■ お問い合わせ内容
${message}

■ お問い合わせ種別
${category}

■ お名前
${name}

■ メールアドレス
${email}

■ ご所属
${organization}

■ 電話番号
${phone}

よろしくお願いいたします。`;

      // メールリンクを作成
      const subject = `【${category}】${name}様からのお問い合わせ`;
      const mailtoLink = `mailto:info@shizuoka-musicsupport.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // メールアプリを開く
      window.location.href = mailtoLink;
    });
  }
});
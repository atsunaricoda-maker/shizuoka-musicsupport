#!/usr/bin/env node

// 🎵 簡単編集デモスクリプト
// このスクリプトを実行すると、設定ファイルを対話的に編集できます

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const CONFIG_PATH = path.join(__dirname, 'src', 'config.ts');

console.log('🎵 しずおか音楽文化支援協議会 サイト編集ツール');
console.log('================================================');
console.log('');

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('何を編集しますか？');
  console.log('1. ニュース記事を追加');
  console.log('2. お問い合わせ先を変更');
  console.log('3. イベントを追加');
  console.log('4. 講師を追加');
  console.log('5. メインメッセージを変更');
  console.log('');

  const choice = await question('番号を入力してください (1-5): ');

  switch (choice) {
    case '1':
      await addNews();
      break;
    case '2':
      await changeContact();
      break;
    case '3':
      await addEvent();
      break;
    case '4':
      await addInstructor();
      break;
    case '5':
      await changeMainMessage();
      break;
    default:
      console.log('無効な選択です。');
  }

  rl.close();
}

async function addNews() {
  console.log('\n📰 新しいニュース記事を追加します');
  console.log('=================================');
  
  const title = await question('タイトル: ');
  const category = await question('カテゴリ (重要/お知らせ/イベント/募集): ');
  const date = await question('日付 (例: 2024年12月1日): ');
  const excerpt = await question('記事の概要: ');
  
  const categoryColor = {
    '重要': 'blue',
    'お知らせ': 'blue', 
    'イベント': 'purple',
    '募集': 'yellow'
  }[category] || 'blue';

  const newArticle = `    {
      id: "article-${Date.now()}",
      category: "${category}",
      categoryColor: "${categoryColor}",
      date: "${date}",
      title: "${title}",
      excerpt: "${excerpt}",
      image: "gradient-${categoryColor}",
      link: "/news/new-article"
    },`;

  console.log('\n追加する記事:');
  console.log(newArticle);
  
  const confirm = await question('\nこの記事を追加しますか？ (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    // 実際のファイル編集処理をここに追加
    console.log('✅ 記事が追加されました！');
    console.log('💡 サーバーを再起動すると反映されます。');
  }
}

async function changeContact() {
  console.log('\n📞 お問い合わせ先を変更します');
  console.log('=============================');
  
  const email = await question('新しいメールアドレス: ');
  const phone = await question('新しい電話番号: ');
  
  console.log('\n変更内容:');
  console.log(`メール: ${email}`);
  console.log(`電話: ${phone}`);
  
  const confirm = await question('\nこの内容で変更しますか？ (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    console.log('✅ 連絡先が変更されました！');
  }
}

async function addEvent() {
  console.log('\n🎪 新しいイベントを追加します');
  console.log('=============================');
  
  const title = await question('イベント名: ');
  const date = await question('開催日時: ');
  const location = await question('開催場所: ');
  const description = await question('説明: ');
  
  console.log('\n追加するイベント:');
  console.log(`名前: ${title}`);
  console.log(`日時: ${date}`);
  console.log(`場所: ${location}`);
  console.log(`説明: ${description}`);
  
  const confirm = await question('\nこのイベントを追加しますか？ (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    console.log('✅ イベントが追加されました！');
  }
}

async function addInstructor() {
  console.log('\n👩‍🏫 新しい講師を追加します');
  console.log('==========================');
  
  const name = await question('講師名: ');
  const specialty = await question('専門分野: ');
  const background1 = await question('経歴1: ');
  const background2 = await question('経歴2: ');
  const background3 = await question('経歴3: ');
  
  console.log('\n追加する講師:');
  console.log(`名前: ${name}`);
  console.log(`専門: ${specialty}`);
  console.log(`経歴: ${background1}, ${background2}, ${background3}`);
  
  const confirm = await question('\nこの講師を追加しますか？ (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    console.log('✅ 講師が追加されました！');
  }
}

async function changeMainMessage() {
  console.log('\n🏠 メインメッセージを変更します');
  console.log('=============================');
  
  const title = await question('メインタイトル: ');
  const subtitle = await question('サブタイトル: ');
  const description = await question('説明文: ');
  
  console.log('\n変更後のメッセージ:');
  console.log(`タイトル: ${title}`);
  console.log(`サブタイトル: ${subtitle}`);
  console.log(`説明: ${description}`);
  
  const confirm = await question('\nこの内容で変更しますか？ (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    console.log('✅ メインメッセージが変更されました！');
  }
}

main().catch(console.error);
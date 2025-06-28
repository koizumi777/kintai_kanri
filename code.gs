/**
 * WebアプリとしてアクセスされたときにHTMLページを返す関数
 */
function doGet(e) {
  // index.htmlという名前のファイルからHTMLを生成して返す
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('勤怠記録アプリ'); // ブラウザのタブに表示されるタイトル
}

/**
 * スプレッドシートにデータを書き込む関数
 * HTML側のJavaScriptから呼び出される
 * @returns {string} 成功メッセージを返す
 */
function writeData() {
  try {
    // 操作するスプレッドシートとシートを指定
    // もしシート名が「シート1」でない場合は、実際のシート名に変更してください。
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1'); 
    
    // 記録するデータを準備
    const timestamp = new Date();
    const memo = 'ボタンがクリックされました';
    
    // シートの最終行に新しい行を追加して書き込む
    sheet.appendRow([timestamp, memo]);
    
    // 成功したことを伝えるメッセージをHTML側に返す
    return 'スプレッドシートへの書き込みに成功しました。';

  } catch (error) {
    // もしエラーが起きたら、ログに記録し、エラーメッセージをHTML側に返す
    console.error('書き込みエラー:', error);
    throw new Error('スプレッドシートへの書き込みに失敗しました。シート名などを確認してください。');
  }
}
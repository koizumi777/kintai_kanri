/**
 * WebアプリとしてアクセスされたときにHTMLページを返す関数
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('勤怠記録アプリ');
}

/**
 * スプレッドシートにデータを書き込む関数
 * HTML側からステータス（'入室' or '退室'）を受け取る
 * @param {string} status フロントエンドから渡されるステータス文字列
 * @returns {string} 成功メッセージを返す
 */
function writeData(status) { // ← statusを引数として受け取る
  try {
    const userEmail = Session.getActiveUser().getEmail(); 
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    const timestamp = new Date();
    
    // appendRowに、引数で受け取ったstatusを書き込む
    sheet.appendRow([timestamp, status, userEmail]); 
    
    // 成功メッセージをHTML側に返す
    return `「${status}」を記録しました。(${new Date().toLocaleTimeString()})`;

  } catch (error) {
    console.error('書き込みエラー:', error);
    throw new Error('スプレッドシートへの書き込みに失敗しました。');
  }
}
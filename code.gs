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
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1'); // 注意: シート名が違う場合は修正
    const timestamp = new Date();
    
    // appendRowに、引数で受け取ったstatusを書き込む
    sheet.appendRow([timestamp, status]); 
    
    // 成功メッセージをHTML側に返す
    return `「${status}」を記録しました。(${new Date().toLocaleTimeString()})`;

  } catch (error) {
    console.error('書き込みエラー:', error);
    throw new Error('スプレッドシートへの書き込みに失敗しました。');
  }
}/**
 * WebアプリとしてアクセスされたときにHTMLページを返す関数
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('記録アプリ');
}

/**
 * 【勤怠用】スプレッドシートに「入室」「退室」のステータスを書き込む関数
 * @param {string} status フロントエンドから渡されるステータス文字列
 * @returns {string} 成功メッセージを返す
 */
function writeData(status) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    const timestamp = new Date();
    
    sheet.appendRow([timestamp, status, userEmail]); 
    
    return `「${status}」を記録しました。(${new Date().toLocaleTimeString()})`;

  } catch (error) {
    console.error('勤怠記録エラー:', error);
    throw new Error('シート1への書き込みに失敗しました。');
  }
}

/**
 * 【日記・TODO用】スプレッドシートに自由なテキストを書き込む関数
 * @param {string} memo フロントエンドのテキストエリアから渡される文字列
 * @returns {string} 成功メッセージを返す
 */
function writeDiary(memo) { // 修正点1, 2
  try {
    const userEmail = Session.getActiveUser().getEmail(); // 修正点3
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
    const timestamp = new Date();
    
    // 引数で受け取ったmemoを書き込む
    sheet.appendRow([timestamp, memo, userEmail]); 
    
    return `日記・TODOを記録しました。`;

  } catch (error) {
    console.error('日記記録エラー:', error);
    throw new Error('シート2への書き込みに失敗しました。');
  }
}

function write_dialy(strings){
  try{
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2'); // 注意: シート名が違う場合は修正
    const timestamp = new Date();
    // appendRowに、引数で受け取ったstatusを書き込む
    sheet.appendRow([timestamp, status]); 
    
    // 成功メッセージをHTML側に返す
    return `「${status}」を記録しました。(${new Date().toLocaleTimeString()})`;
  } catch (error) {
    console.error('書き込みエラー:', error);
    throw new Error('スプレッドシートへの書き込みに失敗しました。');
  }
}
/**
 * 【新規追加】日記・TODOシートから最新の記録を取得する関数
 * @returns {string} 最新の記録内容の文字列
 */
function getLatestDiary() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
    const lastRow = sheet.getLastRow(); // データが存在する最終行の番号を取得

    // ヘッダー行のみ、またはデータが全くない場合は、メッセージを返す
    if (lastRow <= 1) {
      return "まだ記録はありません。";
    }

    // 最終行のB列（2列目）の値を取得して返す
    const latestMemo = sheet.getRange(lastRow, 2).getValue();
    return latestMemo;

  } catch (error) {
    console.error('読み込みエラー:', error);
    return "データの読み込みに失敗しました。";
  }
}

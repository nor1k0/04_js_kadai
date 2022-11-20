       // Import the functions you need from the SDKs you need
       import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
       // 貼り付ける場所
      import { getDatabase, ref, push,set, onChildAdded, remove, onChildRemoved , serverTimestamp} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
      //
      
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      const firebaseConfig = {
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      const db = getDatabase(app);
      const dbRef = ref(db, '04-js-kadai');
      const myTimestamp = serverTimestamp();

      console.log(myTimestamp )

      // 送信処理を記述
      $('#send').on('click', function () {

// id="uname" の場所を取得します🤗
const uname = $('#uname').val();
// console.log(uname, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

// id="text" の場所を取得します🤗
const text = $('#text').val();
// console.log(text, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

// 取得できているか表示の確認をしましょう！
// これ必須！ 表示の確認ができて方はalertをコメントアウトしておきましょう🤗
// alert(uname + text);

// データの塊を作ります🤗
// msg という名前で塊を作ります
// unameという鍵の名前
// textというカギの名前
// 作成したデータの塊をfirebaseに送信をします⇨つまりこれが保存になります🤗
const msg = {
  uname: uname,
  text: text,
  time: myTimestamp,
}


// firebaseに送る準備をしていることになります🤗
const newPostRef = push(dbRef) //データを送信できる準備
set(newPostRef, msg); // firebaseの登録できる場所に保存するイメージです🤗

// 送信後に、入力欄を空にしましょう🤗
$('#text').val("");

// これを使うとどうなるかみてみましょう🤗
$("#text").focus();

// send送信イベント この下消さない
});


$("#text").on('keydown', function (e) {
console.log(e, 'イベントのデータの塊')
console.log(e.keyCode, 'イベントのデータの塊')
// この下消さない　キーボードを押した時のクリック
});

// 受信処理を記述
onChildAdded(dbRef, function (data) {
// ここからが受信処理が始まります

// 登録されたデータを取得します🤗
const msg = data.val();
console.log(msg, '取得したデータの塊')
const key = data.key;
console.log(key, 'データの塊にアクセス')

//UNIX エポック時間 (UNIX Epoch time)からJSTへ変換
let dateTime = new Date(msg.time);
console.log(dateTime);
let date = dateTime.toLocaleDateString('ja-JP').slice(5)
console.log(date);
console.log(dateTime.toLocaleTimeString('ja-JP'));

// es6のテンプレートリテラル
let h = `
    <div class="box">
      <div class="box-inner">
        <p class="date">${Date(msg.time).slice(4, 25)}</p>
        <p class="name">${msg.uname}</p>
        <p class="msg">${msg.text}</p>
        <button class="clear" data-a=${key}>削除</button>
      </div>
    </div>
`;

// htmlに埋め込みましょう🤗
// append();というjqueryのおまじないを使います
$("#output").append(h);

});


// 削除をボタンを押したら⇨アラートが出れば成功！！
$(document).on("click", ".clear", function () {
  let v = $(this).data("a");
  //  console.log(v, "おや");
  //  let aa = $(this).data("a"); //data-a data-は省略するので　「a」
   console.log(v, "カギ");
  remove(ref(db, "04-js-kadai/" + v));
  location.reload(); // jsのおまじない、本来はfirebase側に onChildRemoved
});


// jsを記述する際はここに記載していく

// ScrollReveal


ScrollReveal().reveal('.field_course', {
    duration: 500,
    viewFactor:0.2,
    reset:true
});

ScrollReveal().reveal('.field_access', {
    duration: 500,
    viewFactor:0.2,
    reset:true
});

ScrollReveal().reveal('.field_news', {
    duration: 500,
    viewFactor:0.2,
    reset:true
});

ScrollReveal().reveal('.field_contact', {
    duration: 500,
    viewFactor:0.2,
    reset:true
});

//Cookie
(function() {
  console.log('即時関数');

  // DOM-Elementを取得しておく
  const cookieConsent = document.querySelector('.cookie-consent');
  const cookieAgree = document.querySelector('.cookie-agree');
  const cookieReject = document.querySelector('.cookie-reject');

  // Cookieを拒否した時用のFlag
  const rejectFlag = sessionStorage.getItem('rejectFlag');
  console.log({rejectFlag});

  const cookieData = document.cookie;
  console.log({cookieData});

  // CookieをSetしているかどうかを判定するためのFlag
  let cookieSetFlag = false;

  // 綺麗に分割するために「'; '」(セミコロン&半角スペース)で区切る！
  const cookieDataList = cookieData.split('; ');
  console.log({cookieDataList});

  for (const cookie of cookieDataList) {
      const cookieSplit = cookie.split('=');
      console.log({cookieSplit});

      if (cookieSplit[0] === 'robotama-cookie') cookieSetFlag = true;
      console.log({cookieSetFlag});
  }

  // Cookieの有効期限（日）をSetする
  const expire = 0;

  // 1. Yes Cookie-Set-Function => 引数は有効期限(日)
  function SetCookie(expire){
      const current = new Date();
      expire = current.getTime() + expire * 24 * 3600 * 1000;

      // CookieにDataをSetする
      document.cookie = `robotama-cookie=robotama-read; expire=${expire}`;
  }

  // 2. Cookieを拒否したときに、Cookieをすべて削除するFunction
  function DeleteAllCookie(){
      const maxAgeZero = 'max-age=0';

      for (const cookie of cookieDataList) {
          const cookieSplit = cookie.split('=');

          document.cookie = `${cookieSplit[0]}=; ${maxAgeZero}`;
      }
  }

  // 3. Popup表示のFunction
  function PopupDisplay(){
      cookieConsent.classList.add('is-show');
  }

  if (cookieSetFlag) {
      console.log('cookieSetFlagが立っている！Cookie同意済みUser');
  } else {
      if (rejectFlag) {
          console.log('rejectFlagが立っている！Cookie-拒否User');
      } else {
          console.log('2つのFlagが立っていない！初回Access-Userか、有効期限切れUser');
          PopupDisplay();
      }
  }

  // Cookie同意ボタンにイベントを追加する
  cookieAgree.addEventListener('click', ()=> {
      cookieConsent.classList.add('cc-hide2');
      SetCookie(expire);
  });
  
  // Cookie拒否ボタンにイベントを追加する
cookieReject.addEventListener('click', ()=> {
  cookieConsent.classList.add('cc-hide2');

  // Cookie拒否Userは、SessionStorageで管理
  // Sessionが切れれば、また表示される
  sessionStorage.setItem('rejectFlag', true);
  DeleteAllCookie();
});
 
}());
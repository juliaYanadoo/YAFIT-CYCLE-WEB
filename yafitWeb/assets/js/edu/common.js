// update 2022-08-16 / v2.2 */
const JWT_HEADER_KEY = 'Authorization';
const JWT_PREFIX = 'Bearer ';
const META_SUCCESS_CODE = 200;
const KEY_USER = 'user';
const KEY_ACCESS_TOKEN = 'access_token';
const KEY_REFRESH_TOKEN = 'refresh_token';

let presentProductSeqLamp = 1000920;
let presentProductSeqHumidifier = 1000919;

document.addEventListener('DOMContentLoaded', function () {
  getGnbListView();


  document.querySelector('.depth2-item').classList.remove('active');
  document.querySelector('.depth3-menu').classList.remove('active');

});

window.addEventListener('load', function () {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    if (includePath) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open('GET', includePath, true);
      xhttp.send();
    }
  });

  showProfileImage();
});

function handleScroll() {
  const ScrollChk = window.scrollY || document.documentElement.scrollTop;
  const setScroll = document.querySelector('body').classList;
  !ScrollChk <= 0 ? setScroll.add('fixed') : setScroll.remove('fixed');
}

function modalYU(linkURL) {
  let node = document.createElement('div');
  node.classList.add('pop-yu');
  document.querySelector('header').after(node);

  let yuButton =
    linkURL == undefined || linkURL == '' || linkURL == 'none'
      ? ''
      : '<button class="btn active" onclick="window.location.href=\'' +
        linkURL +
        '\'"><span>입학금 월 8,250원과 함께 결제</span></button>';
  let yuContent =
    '  <div class="modal-wrap course">\n' +
    '    <div class="dimmed" onclick="closeModal(\'pop-yu\');"></div>\n' +
    '    <div class="modal-inner">\n' +
    '      <button type="button" class="btn-modal-close white" onclick="closeModal(\'pop-yu\');"><i class="blind">닫기</i></button>\n' +
    '      <div class="modal-content type-fixed-button" style="height:80%;">\n' +
    '        <div class="btn-flex-form">\n' +
    '          <div class="course-txt">\n' +
    '            <strong>YANADOO UNIVERSITY <br/><span>‘입학회원’</span> 전용 상품입니다</strong>\n' +
    '            <p>한달, 커피 단 두 잔 값으로 <br/>입학회원만의 프리미엄 혜택 평생 유지!</p>\n' +
    '            <p><span>오직 입학 회원만 누리는 혜택</span></p>\n' +
    '            <img src=https://english.yanadoocdn.com/upload/yanadoo/new/common/img_entrance_goods.png alt=""/>\n' +
    '          </div>' +
    yuButton +
    '          <a class="btn-yta" href="' +
    yndUrl +
    '/promotion/yanadooUniversity"><span>입학금 월 8,250원과 함께 결제</span></a>\n' +
    '         <span className="month-price-txt">* 총 99,000원 / 12개월 (무) 할부 시</span>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>';
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.pop-yu').innerHTML = yuContent;
}

function modalGoods() {
  closeModal('modal-yu-goods');
  let node = document.createElement('div');
  node.classList.add('modal-yu-goods');
  document.querySelector('header').after(node);

  getEntrancePresents();

  let yuContent =
    '<div class="modal-wrap modal-yu-goods">\n' +
    '  <div class="dimmed" onclick="closeModal(\'modal-yu-goods\');"></div>\n' +
    '  <div class="modal-inner">\n' +
    '    <button type="button" class="btn-modal-close" onclick="closeModal(\'modal-yu-goods\');"><i class="blind">닫기</i></button>\n' +
    '    <div class="modal-content">\n' +
    '      <dl>\n' +
    '          <dt class="type-02">\n' +
    '               <strong><span>YANADOO UNIVERSITY</span><em>성공지원 입학템<br/>웰컴 키트를 선택해 주세요</em></strong>\n' +
    '               <span><em>평생 입학 회원이 된 것을 환영합니다!</em></span>\n' +
    '          </dt>\n' +
    '          <dd>\n' +
    '             <ul>\n' +
    '               <li class="goods1">\n' +
    '                   <label for="goods1"><span class="goods-check-box"><input type="radio" id="goods1" name="yuGoods" value="' +
    presentProductSeqHumidifier +
    '"><span class="chk"></span><em>가습기</em></span></label>\n' +
    '               </li>\n' +
    '               <li class="goods2">\n' +
    '                   <label for="goods2"><span class="goods-check-box"><input type="radio" id="goods2" name="yuGoods" value="' +
    presentProductSeqLamp +
    '"><span class="chk"></span><em>램프</em></span></label>\n' +
    '               </li>\n' +
    '             </ul>\n' +
    '             <em>(웰컴 키트 선택 후 변경 불가)</em>\n' +
    '          </dd>\n' +
    '      </dl>\n' +
    '      <button class="btn active" onclick="modalGoodsChecked();">수강 신청하기</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>';
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.modal-yu-goods').innerHTML = yuContent;
}

function modalGoodsChecked() {
  let radioCheck = document.getElementsByName('yuGoods');
  for (let i = 0; i < radioCheck.length; i++) {
    if (radioCheck[i].checked) {
      break;
    }
  }
}

function closeModal(popClassName) {
  let modalItem = document.querySelectorAll('.' + popClassName);
  document.querySelector('body').classList.remove('modal-open');
  for (let i = 0; i < modalItem.length; i++) {
    document.querySelectorAll('.' + popClassName)[i].style.display = 'none';
  }
}

function modalMediaOpen(mediaURL) {
  let modalItem = document.createElement('div');
  modalItem.classList.add('modal-wrap', 'modal-wrap-media');
  modalItem.innerHTML =
    '<div class="dimed" onclick="modalMediaClose();"></div>' +
    '<div class="modal-content">' +
    '  <button type="button" class="btn-close" onclick="modalMediaClose();">닫기</button>' +
    '  <iframe width="100%" height="100%" frameborder="0" src="' +
    mediaURL +
    '" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>' +
    '</div>';
  document.querySelector('header').after(modalItem);
  document.querySelector('body').classList.add('locked-modal');
  document.querySelector('.modal-wrap-media').style.display = 'block';
}

function modalMediaClose() {
  document.querySelector('.modal-wrap-media').remove();
  document.querySelector('body').classList.remove('locked-modal');
}

// GA 이벤트 호출 함수입니다.
function gaEvent(gaItem) {
  if (gaItem !== undefined && typeof dataLayer !== 'undefined') {
    dataLayer.push({ event: gaItem, product_name: gaItem });
  }
}

// 메인 GNB를 그려주는 함수입니다.
let gnbItems;
function gnbMain() {
  let gnbMainList = '';
  // menuName 값이 이벤트가 아닌 메뉴들을 대메뉴로 분류합니다.
  gnbItems
    .filter((item) => item.menuName !== '이벤트')
    .map((item, idx) => {
      gnbMainList +=
        '\n<li><a href=' +
        item.link +
        ' onclick="gnbDetail(' +
        idx +
        ')">' +
        item.menuName +
        '<span>' +
        item.description +
        '</span></a></li>\n';
    });
  // header 태그에 메뉴를 그립니다.
  document.querySelector('header').querySelector('.main-menu').innerHTML =
    '\n' +
    '<div class="gnb-main">\n' +
    '  <div class="flex">\n' +
    '    <h1><a href="/">야나두</a></h1>\n' +
    '    <ul>' +
    gnbMainList +
    '</ul>\n' +
    '  </div>\n' +
    '</div>\n';
  // GNB 기본 버튼, 모바일 햄버거 메뉴를 그리는 함수를 실행합니다.
  document.querySelector('header').querySelector('.side-menu').classList.remove('active');
  gnbBaseSet(0);
}

// 상세 GNB를 그려주는 함수입니다.
// ex) 야나두영어, 유니버시티, 야핏
function gnbDetail(depthNum) {
  let gnbContent = ''; // 적용 필요한 메뉴의 GNB 태그를 변수에 저장.
  const gnbData = gnbItems[depthNum];
  let gnbDepth1 = '';
  let gnbDepth2 = '';
  let gnbDepth2Inner = '';

  // 1depth의 이벤트 메뉴를 체크.
  gnbItems
    .filter((item) => item.menuName !== '이벤트')
    .map((item, idx) => {
      gnbDepth1 +=
        '\n<li><a href=' +
        item.link +
        (depthNum === idx ? ' class="active"' : '') +
        ' onclick="gnbDetail(' +
        idx +
        ')" onmouseover="gnbInfoSet(' +
        idx +
        ');" onmouseout="gnbInfoSet(' +
        depthNum +
        ');">' +
        item.menuName +
        '</a></li>\n';
    });

  // 2depth의 선택된 메뉴를 gnbDepth2Inner 변수에 태그를 저장.
  gnbData.childGnbMenus.forEach((item) => {
    let gnbDepth3 = '';
    item.childGnbMenus.forEach((subItem) => {

      
      gnbDepth3 +=
        '    <li' +
        (subItem.iconType !== 'NONE' ? ' class="' + subItem.iconType.toLowerCase() + '"' : '') +
        '><a class="" href="' +
        subItem.link +
        '"' +
        (subItem.gaEventName !== undefined
          ? ' onclick="gaEvent(\'' + subItem.gaEventName + '\');"'
          : '') +
        '>' +
        subItem.menuName +
        '</a></li>\n';
    });


    gnbDepth2Inner +=
      '\n' +
      '<li>\n' +
      '  <a href="" class="depth2-item" style="border-bottom-color:#d0d0d0'  +
      '" onclick="mobileNavClick(this, \'' +
      item.link +
      "', '" +
      item.linkTarget +
      "'" +
      (item.gaEventName !== undefined ? ", '" + item.gaEventName + "'" : '') +
      '); return false;"><span class="' +
      (gnbData.gnbMenuSeq === 49
        ? `eng`
        : gnbData.gnbMenuSeq === 105
        ? `yu`
        : gnbData.gnbMenuSeq === 71
        ? `yafit`
        : ``) +
      '">' +
      item.menuName +
      '</span></a>\n' +
      (item.childGnbMenus.length > 0 ? '  <ul>\n' + gnbDepth3 + '  </ul>\n' : '') +
      '</li>\n';
  });

  // gnbDepth2에 전체 태그를 저장.
  gnbDepth2 =
    '\n' +
    '<section class="gnb-list">\n' +
    '  <div class="flex">\n' +
    '    <div class="gnb-box" id="gnbAreaBox">\n' +
    '      <h2 class="' +
    (gnbItems[depthNum].menuName === '야나두영어'
      ? 'logo-eng'
      : gnbItems[depthNum].menuName === '유니버시티'
      ? 'logo-yu'
      : gnbItems[depthNum].menuName === '야나두 핏'
      ? 'logo-yafit'
      : 'logo-ynd') +
    '"><a href="' +
    gnbItems[depthNum].link +
    '" target="_' +
    gnbItems[depthNum].linkTarget +
    '">' +
    gnbItems[depthNum].menuName +
    '</a></h2>\n' +
    '        <ul class="active" id="autoGnbBox" onmousedown="onDragStart(event)" onmousemove="onDragMove(event)" onmouseup="onDragEnd()" onmouseleave="onDragEnd()">\n' +
    gnbDepth2Inner +
    '        </ul>\n' +
    '<button type="button" class="btn-gnb-prev" onclick="gnbMoveEvent(\'prev\');">prev</button>' +
    '<button type="button" class="btn-gnb-next" onclick="gnbMoveEvent(\'next\');">next</button>' +
    '     </div>\n' +
    '  </div>\n' +
    '</section>\n' +
    '<div id="mobileDimed" onclick="mobileNavClose();"></div>\n';

  // 선택된 gnbDepth1 상단바 영역 저장.
  gnbContent =
    '\n' +
    '<section class="gnb-bar" style="background-color:' +
    gnbItems[depthNum].backgroundColor +
    '">\n' +
    '  <div class="flex">\n' +
    '    <strong id="gnbSlogan">' +
    gnbItems[depthNum].description +
    '</strong>\n' +
    '    <ul>\n' +
    '      <li><button type="button" onclick="location.href=\'' +
    yndUrl +
    '\';">HOME</button></li>\n' +
    gnbDepth1 +
    '    </ul>\n' +
    '  </div>\n' +
    '</section>\n' +
    gnbDepth2;

  // 변수에 저장된 메뉴 GNB 태그를 header 에 적용.
  document.querySelector('header').querySelector('.main-menu').innerHTML = gnbContent;
  document.querySelector('header').querySelector('.side-menu').classList.add('active');
}

// GNB 상단영역에 마우스 오버 시 노출되는 정보를 변경하는 함수입니다.
function gnbInfoSet(num) {
  document.querySelector('.gnb-bar').style.backgroundColor = gnbItems[num].backgroundColor;
  document.getElementById('gnbSlogan').innerHTML = gnbItems[num].description;
}

// 2뎁스 메뉴 선택 시 1024 기준 분기처리 동작 함수입니다.
function mobileNavClick(e, link, linkTarget, gaItem) {
  if (window.innerWidth <= 1024 && e.nextSibling.nextElementSibling !== null) {

    document
      .querySelector('.gnb-list')
      .querySelectorAll('.depth2-item')
      .forEach((item) => {
        item.classList.remove('active');
        item.classList.remove('actived');
      });
    document.getElementById('mobileDimed').classList.add('active');
    e.classList.add('active');
  } else {
    gaEvent(gaItem);
    linkTarget === 'BLANK' ? window.open(link) : (location.href = link);
  }
}

// 1024이하 사이즈에서 3뎁스 메뉴 노출되었을때, GNB 외 영역 클릭 시 메뉴를 닫는 함수입니다.
function mobileNavClose() {
  document
    .querySelector('.gnb-list')
    .querySelectorAll('.depth2-item')
    .forEach((item) => item.classList.remove('active'));
  document.getElementById('mobileDimed').classList.remove('active');
}

// mobile LNB 메뉴 셋팅 함수입니다.
function lnbSet(menuNum, subMenuNum, detailMenuNum) {
  let lnbDepth1 = document.querySelector('.depth1').querySelectorAll('li');
  let lnbDepth2 = '';
  let lnbDepth3 = '';
  // LNB 1depth 의 li의 active를 해제하고, 선택한 메뉴만 active 합니다.
  lnbDepth1.forEach((item) => {
    item.classList.remove('active');
  });
  lnbDepth1[menuNum].classList.add('active');

  // lnb에 들어갈 2,3depth 정보들을 각 변수에 담습니다.
  gnbItems[menuNum].childGnbMenus.forEach((item, idx) => {
    lnbDepth3 = '';

    if (item.childGnbMenus.length > 0) {
      item.childGnbMenus.forEach((subItem, subIdx) => {
        lnbDepth3 +=
          '\n      <li class="depth3-menu' +
          (subItem.iconType !== 'NONE' ? ' ' + subItem.iconType.toLowerCase() : '') +
          (detailMenuNum === subIdx ? ' active' : '') +
          '"><a href="' +
          subItem.link +
          '" ' +
          (subItem.linkTarget === 'BLANK' ? ' target="_blank"' : '') +
          (subItem.gaEventName !== undefined
            ? ' onclick="gaEvent(\'' + subItem.gaEventName + '\');"'
            : '') +
          '>' +
          subItem.menuName +
          '</a></li>\n';
      });
    }
    lnbDepth2 +=
      '\n' +
      '  <li class="depth2-menu' +
      (idx === subMenuNum ? ' active' : '') +
      (item.childGnbMenus.length <= 0 ? ' nochild' : '') +
      '">\n' +
      (item.childGnbMenus.length <= 0
        ? '    <a href="' +
          item.link +
          '" ' +
          (item.linkTarget === 'BLANK' ? ' target="_blank"' : '') +
          (item.gaEventName !== undefined
            ? ' onclick="gaEvent(\'' + item.gaEventName + '\');"'
            : '') +
          '>'
        : '    <a href="#;" onclick="lnbDepth2Active(this); return false;">') +
      item.menuName +
      '</a>\n' +
      (lnbDepth3 !== '' ? '    <ul>\n' + lnbDepth3 + '    </ul>\n' : '') +
      '  </li>\n';
  });
  document.getElementById('lnbBody').innerHTML = lnbDepth2;
}

// LNB 2depth 클릭 시 메뉴 동작 함수입니다.
function lnbDepth2Active(e) {
  const depth2Item = document.querySelector('.depth2').querySelectorAll('.depth2-menu');
  depth2Item.forEach((item) => item.classList.remove('active'));
  e.parentElement.classList.add('active');
}


let isDrag = false;
let beginX = 0;
function onDragStart(e) {
  e.preventDefault();
  const targetItem = document.getElementById('autoGnbBox');
  isDrag = true;
  beginX = e.pageX + targetItem.scrollLeft;
}
function onDragEnd() {
  isDrag = false;
}
function onDragMove(e) {
  const targetItem = document.getElementById('autoGnbBox');
  if (isDrag) targetItem.scrollLeft = beginX - e.pageX;
}



// GNB 우측 버튼 + 햄버거메뉴 영역을 그려줍니다.
let gnbActiveCheck = true;
function gnbBaseSet(depthNum) {
  // 이벤트 메뉴 데이터를 eventData 변수에 저장.
  const eventData = gnbItems.filter((item) => item.menuName === '이벤트');
  let gnbEventList = '';
  let lnbDepth1 = '';

  // eventData 값을 활용, 이벤트 메뉴 목록을 적용.
  eventData[0].childGnbMenus.forEach((item) => {
    gnbEventList +=
      '\n<li><a href="' +
      item.link +
      '"' +
      (item.linkTarget === 'BLANK' ? 'target="_blank"' : '') +
      '>' +
      item.menuName +
      '</a></li>\n';
  });

  // lnb에 들어갈 1depth 정보들을 각 변수에 담습니다.
  gnbItems
    .filter((item) => item.menuName !== '이벤트')
    .map((item, idx) => {
      lnbDepth1 +=
        '\n<li ' +
        (depthNum === idx ? 'class="active" ' : '') +
        'style="border-bottom-color:' +
        item.backgroundColor +
        '"><button type="button" onclick="lnbSet(' +
        idx +
        ',0);">' +
        item.menuName +
        '</button></li>\n';
    });

  document.querySelector('header').querySelector('.side-menu').innerHTML =
    '\n' +
    '  <button class="btn-event">이벤트</button>\n' +
    '  <ul>' +
    gnbEventList +
    '</ul>\n' +
    // GNB 우측 상단, 로그인 여부 체크 후 보여질 버튼 분기처리 조건.
    (isLoggedIn()
      ? '  <div class="mypage-box">\n' +
        '    <button type="button" class="btn-mypage">\n' +
        '      <span class="user-thumb-box ico-user"></span>\n' +
        '    </button>\n' +
        '    <ul>\n' +
        '      <li><a aria-current="page" class="active" href="' +
        yndUrl +
        '/mypage/1">마이페이지</a></li>\n' +
        '      <li><a class="" href="' +
        yndUrl +
        '/member/auth">회원정보수정</a></li>\n' +
        '      <li><button type="button" class="btn-logout" onclick="logout();"><span>로그아웃</span></button></li>\n' +
        '    </ul>\n' +
        '  </div>\n'
      : '  <button type="button" class="btn-login" onclick="location.href=\'' +
        yndUrl +
        '/login?redirect=' +
        encodeURIComponent(window.location.href) +
        '\';"><span>로그인</span></button>\n') +
    '  <button type="button" class="btn-mypage" onclick="location.href=\'' +
    yndUrl +
    '/mypage/1\';"><span class="ico-user"><i class="blind">mypage</i></span></button>\n' +
    '  <section class="nav-group">\n' +
    '    <div class="nav-item">\n' +
    '      <div class="nav-close" onclick="document.querySelector(\'.nav-group\').classList.remove(\'active\');">\n' +
    '        <span><i class="blind">레이어 닫기</i></span>\n' +
    '      </div>\n' +
    '      <button type="button" onclick="document.querySelector(\'.nav-group\').classList.toggle(\'active\');"><span class="ico-hamburger"><i class="blind">hamburger menu</i></span></button>' +
    '      <nav class="lnb-m">\n' +
    '        <a href="' +
    yndUrl +
    '" class="logo"><i class="blind">야나두</i></a>\n' +
    '        <div class="depth1"><ul>' +
    lnbDepth1 +
    '</ul></div>\n' +
    '        <ul class="depth2" id="lnbBody">\n' +
    '        </ul>\n' +
    '        <div class="btn-group-bottom">\n' +
    '          <button type="button" onclick="location.href=\'' +
    yndUrl +
    '/event/list/1\';">이벤트</button>\n' +
    (isLoggedIn()
      ? '<button type="button" onclick="logout();">로그아웃</button>\n'
      : '<button type="button" onclick="location.href=\'' +
        yndUrl +
        '/login?redirect=' +
        encodeURIComponent(window.location.href) +
        '\';">로그인</button>\n') +
    '        </div>\n' +
    '        <div class="btn-app-download">\n' +
    '          <strong class="title">야나두 앱 바로가기</strong>\n' +
    '          <button type="button" onclick="window.open(\'https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2\');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_android_download_288x288.png" alt=""></button>\n' +
    '          <button type="button" onclick="window.open(\'https://itunes.apple.com/kr/app/id1539582420\');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_ios_download_288x288.png" alt=""></button>\n' +
    '        </div>\n' +
    '      </nav>\n' +
    '    </div>\n' +
    '  </section>\n';
  showProfileImage();
  lnbSet(depthNum);
  if (gnbActiveCheck) gnbActive();
}

// GNB 메뉴에 Active 처리하는 함수 입니다.
let activeCheckItem;
function gnbActive() {
  let pageURL = location.href;
  gnbItems.forEach((item, idx) => {
    if (item.gnbMenuSeq !== 63) {
      item.childGnbMenus.forEach((subItem, subIdx) => {
        if (subItem.childGnbMenus.length > 0) {
          subItem.childGnbMenus.forEach((detailItem, detailIdx) => {
            if (
              (pageURL.split('/')[pageURL.split('/').length - 1].split('.')[0] === detailItem.link.split('/')[detailItem.link.split('/').length - 1].split('.')[0]) 
              /*+|| detailItem.link.indexOf(activeCheckItem) !== -1*/
            ) {
              gnbActiveCheck = false;
              gnbDetail(idx);
              document.querySelectorAll('.depth2-menu')[subIdx].classList.add('active');
              document.querySelectorAll('.depth2-item')[subIdx].classList.add('actived');
            document
                .querySelectorAll('.depth2-item')
                [subIdx].parentElement.querySelector('ul')
                .querySelectorAll('li')
                [detailIdx].classList.add('active');
              document.querySelectorAll('.depth3-menu')[detailIdx].classList.add('active');
              lnbSet(idx, subIdx, detailIdx);
              return false;
            }
          });
        } else {
          if (
            (pageURL.split('/')[pageURL.split('/').length - 1].split('.')[0] === subItem.link.split('/')[subItem.link.split('/').length - 1].split('.')[0]) 
            || subItem.link.indexOf(activeCheckItem) !== -1
          ) {
            gnbActiveCheck = false;
            gnbDetail(idx);
            setTimeout(() => {
            document.querySelectorAll('.depth2-menu')[subIdx].classList.add('active');
            document.querySelectorAll('.depth2-item')[subIdx].classList.add('actived');
            lnbSet(idx, subIdx, 0);
          },10)
            return false;
          }
        }
      });
    }
  });
}


// GNB 정보 API를 호출합니다.
function getGnbListView() {
  fetch(API_HOST + '/v2/gnb-menu/list')
    .then((response) => response.json())
    .then((result) => {
      if (result.meta.code === 200 && result.data) {
        gnbItems = result.data;
        document.querySelector('header').innerHTML =
          '<div class="main-menu"></div><div class="side-menu"></div>';
        gnbMain();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

// 프로모션 로그아웃 함수.
function logout() {
  removeUserInfo();
  deleteCookie('refresh_token');
  location.reload();
}

// 페이지 내 별도로 적용된 fixed 상단 고정 메뉴가 있는 경우 사용될 함수.
// 고정이 필요한 메뉴 영역에 landing-fixed-top 클래스를 추가합니다.
// 페이지 내 스크롤 이벤트 발생 시 해당 함수를 호출하여, fixed 적용 시 Header 영역바로 아래에 위치할 수 있도록 top 값을 지정합니다.
function landingNavFixed() {
  let headerHeight = document.querySelector('header').offsetHeight;
  if (document.querySelector('.landing-fixed-top')) {
    document.querySelector('.landing-fixed-top').style.top = document
      .querySelector('body')
      .classList.contains('fixed')
      ? headerHeight + 'px'
      : 'auto';
  }
}

const yndUrl = 'https://www.yanadoo.co.kr';

window.addEventListener('DOMContentLoaded', function () {
  activeCheckItem =
    !document.querySelector('.landing') || document.querySelector('.landing').id === ''
      ? 'undefined'
      : document.querySelector('.landing').id;

  if (document.querySelector('.landing-fixed-top')) {
    document.querySelector('header').addEventListener('click', () => landingNavFixed());
  }

  // 프로모션 페이지 진입 시 마다 URL을 historyUrl 쿠키값으로 저장.
  setCookie('historyUrl', location.href);

  if (
    (document.querySelector('.landing') &&
      document.querySelector('.landing').classList.contains('gnb-none')) ||
    getParameterByName('gnbDisplay') === 'n'
  )
    document.querySelector('header').style.display = 'none';

  if (document.querySelector('#footer')) {
    document.querySelector('#footer').innerHTML =
      '<div class="inner-col">' +
      '<h2 class="footer-logo">' +
      '<a href="' +
      yndUrl +
      '" class="logo"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/logo-footer.png" alt="야나두" /></a>\n' +
      '</h2>' +
      '<div class="footer-nav-menu">' +
      '<dl><dt>고객센터</dt><dd><a href="' +
      yndUrl +
      '/service/center">고객센터 바로가기</a></dd>' +
      '<dd><a href="' +
      yndUrl +
      '/service/faq/all/1"><span>자주 묻는 질문</span></a></dd>' +
      '<dd><a href="' +
      yndUrl +
      '/?myInquiry"><span>1:1 문의하기</span></a></dd></dl>' +
      '<dl><dt>카카오톡 상담</dt><dd><a href="https://pf.kakao.com/_xeWxjMu" target="_blank">@야나두 친구추가</a></dd></dl>' +
      '<dl><dt>제휴 및 단체수강 문의</dt><dd><a href="' +
      yndUrl +
      '/promotion/b2bLanding"><span>B2B 및 단체수강 소개</span></a></dd>' +
      '<dd><a href="' +
      yndUrl +
      '/?partnershipInquiry"><span>제휴문의</span></a></dd>' +
      '<dd><a href="' +
      yndUrl +
      '/?courseInquiry"><span>단체 수강 문의</span></a></dd></dl></div>' +
      '<div class="footer-info">' +
      '<strong>무엇을 도와드릴까요?</strong>' +
      '<a href="tel:1600-0563" class="tel">1600.0563</a>' +
      '<span>평일 : 09:00 ~ 18:00</span>' +
      '<span>점심시간 : 12:00 ~ 13:00</span></div>' +
      '<div class="footer-link-area">' +
      '<div class="link-lists">' +
      '<a href="https://apps.apple.com/kr/app/id1539582420" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_ios_download_70x70.png" alt="아이폰 앱 다운로드" />' +
      '</a>' +
      '<a href="https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_android_download_70x70.png" alt="안드로이드 앱 다운로드" />' +
      '</a>' +
      '</div>' +
      '<div class="link-lists">' +
      '<a href="https://www.facebook.com/yanadoo1/?fref=ts" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_facebook_70x70.png" alt="페이스북" />' +
      '</a>' +
      '<a href="https://band.us/band/56561305" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_band_70x70.png" alt="네이버밴드" />' +
      '</a>' +
      '<a href="https://blog.naver.com/yanadooblog" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_blog_70x70.png" alt="네이버블로그" />' +
      '</a>' +
      '<a href="https://post.naver.com/my.nhn?memberNo=25566629" target="_blank">' +
      '<img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_naver_post_70x70.png" alt="네이버포스트" />' +
      '</a></div></div>' +
      '<select name="footerSelect" id="footerSelect" onchange="if (this.value) window.location.href=this.value">' +
      '<option value="#;">Related Sites</option>' +
      '<option value="https://www.youcandoo.co.kr/promotion/yanadoo">유캔두</option>' +
      '</select>' +
      '<div class="footer-utility">' +
      '<a href="' +
      yndUrl +
      '/promotion/company">회사소개</a>' +
      '<a href="' +
      yndUrl +
      '/promotion/yanadooInfo">야나두 서비스 소개</a>' +
      '<a href="' +
      yndUrl +
      '/service/policydetail">개인정보처리방침</a>' +
      '<a href="' +
      yndUrl +
      '/service/termsdetail">이용약관</a>' +
      '<a href="' +
      yndUrl +
      '/service/official/1">공고사항</a><br /><br />' +
      '</div>' +
      '<address>' +
      '<p>주식회사 야나두 (야나두 원격평생교육원)</p>' +
      '<p>사업자등록번호 129-86-23477 · 통신판매업 신고번호 제2018-서울강남-02139호</p>' +
      '<p>대표 김정수, 김민철 · 개인정보보호 책임자 정호용</p>' +
      '<p>주소 서울시 강남구 영동대로 96길 26, 3, 4층 (삼성동, Place 1)</p>' +
      '<p>원격 평생교육 시설신고 서울특별시 강남 서초교육지원청 (제 원516호)</p>' +
      '</address>' +
      '</div>';
  }
  yndModal();
});
// header scroll event
window.addEventListener('scroll', function () {
  handleScroll();
});

function isEmpty(val) {
  return (
    val === undefined ||
    val === null ||
    val === '' ||
    (val !== null && typeof val === 'object' && !Object.keys(val).length)
  );
}

function isNotEmpty(val) {
  return !isEmpty(val);
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function isLoggedIn() {
  const refreshToken = getLocalRefreshToken();
  if (!isActiveToken(refreshToken)) {
    removeUserInfo();
    return false;
  }

  let accessToken = getLocalAccessToken();
  if (!isActiveToken(accessToken)) {
    accessToken = getAccessToken(refreshToken);
    return isActiveToken(accessToken);
  }

  return true;
}

function isActiveToken(token) {
  if (isEmpty(token)) {
    return false;
  }

  if (token.split('.').length !== 3) {
    return false;
  }

  try {
    const payload = b64_to_utf8(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+'));
    const exp = JSON.parse(payload).exp;
    return new Date(exp * 1000) > new Date();
  } catch (e) {
    console.log(e);
    return false;
  }
}

function getAccessToken(refreshToken) {
  let accessToken = '';
  $.ajax({
    url: AUTH_API_HOST + '/auth/v2/sign-in/get-access-token',
    type: 'POST',
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + refreshToken);
    },
    cache: false,
    dataType: 'json',
    success: function (result) {
      if (result.meta.code === META_SUCCESS_CODE) {
        accessToken = result.data.accessToken;
        localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
        localStorage.setItem(KEY_USER, JSON.stringify(result.data.user));
      }
    },
    error: function (e) {
      console.log(e);
    },
  });

  return accessToken;
}

function getLocalAccessToken() {
  return localStorage.getItem(KEY_ACCESS_TOKEN);
}

function getLocalRefreshToken() {
  let refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN);
  let refreshTokenFromCookie = get_cookie2(KEY_REFRESH_TOKEN);
  if (isEmpty(refreshToken) && isNotEmpty(refreshTokenFromCookie)) {
    refreshToken = refreshTokenFromCookie;
    localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);
    deleteCookieForSubDomain(KEY_REFRESH_TOKEN);
  }
  return refreshToken;
}

function getUserFromStorage() {
  return localStorage.getItem(KEY_USER);
}

let userSeq;
function getUser() {
  let userInfo = {};
  $.ajax({
    url: AUTH_API_HOST + '/auth/v2/user',
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
      let token = getLocalAccessToken();
      if (isNotEmpty(token)) {
        xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + token);
      }
    },
    cache: false,
    dataType: 'json',
    success: function (result) {
      if (result.meta.code === META_SUCCESS_CODE) {
        userSeq = result.data.userSeq;
        userInfo = result.data;
      } else {
      }
    },
    error: function (e) {
      console.log(e);
    },
  });

  return userInfo;
}

function showProfileImage() {
  if (!isLoggedIn()) {
    return;
  }
  const userInfoString = getUserFromStorage();
  if (isEmpty(userInfoString) || typeof userInfoString !== 'string') {
    return;
  }

  const userInfo = JSON.parse(userInfoString);
  if (userInfo.profileImageUrl && $('header .ico-user').length > 0) {
    $('header .ico-user')
      .css({ 'background-image': 'url(' + userInfo.profileImageUrl + ')' })
      .addClass('user-thumb-box');
  }

  if (window.setPixelInfo && typeof window.setPixelInfo === 'function') window.setPixelInfo();
}

function removeUserInfo() {
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

function downloadCoupon(couponCode) {
  if (!isLoggedIn()) {
    alert('로그인 후 이용해 주세요.');
    window.location.href = yndUrl + '/login?redirect=' + encodeURIComponent(window.location.href);
    return false;
  }

  $.ajax({
    type: 'POST',
    beforeSend: function (xhr) {
      let token = getLocalAccessToken();
      if (isNotEmpty(token)) {
        xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + token);
      }
    },
    url: API_HOST + '/v2/coupon-publish?couponCode=' + couponCode,
    success: function (data) {
      if (data.meta.code === 200) {
        alert('다운로드가 완료되었습니다.\n할인된 가격으로 구매하세요!');
        if (window['yndModalClose']) {
          yndModalClose();
        }
      } else if (data.meta.code === -1) {
        alert('이미 다운로드하셨습니다.\n할인된 가격으로 구매하세요!');
        if (window['yndModalClose']) {
          yndModalClose();
        }
      } else {
        alert(data.meta.message);
      }
    },
    error: function (e) {
      alert('다시 시도해주세요.');
    },
  });
}

function isEntrancedUser() {
  if (!isLoggedIn()) {
    return false;
  }

  let userInfo = getUser();
  try {
    return userInfo.entrance && userInfo.entrance.entranceStatus === 'ENTRANCE';
  } catch (e) {
    console.log(e);
    return false;
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUtm() {
  let utm = '';
  try {
    utm +=
      getParameterByName('utm_source') +
      '&' +
      getParameterByName('utm_medium') +
      '&' +
      getParameterByName('utm_campaign') +
      '&' +
      getParameterByName('utm_content');
    utm = utm.replace(/&&/g, '&').replace(/&+$/, '');
  } catch (e) {}
  return utm;
}

function getEntrancePresents() {
  $.ajax({
    url: API_HOST + '/v2/store/entrance-present',
    type: 'GET',
    async: false,
    cache: false,
    dataType: 'json',
    success: function (result) {
      for (let i in result.data) {
        if (result.data[i].name.indexOf('가습기') > -1) {
          presentProductSeqHumidifier = result.data[i].productSeq;
        } else if (result.data[i].name.indexOf('램프') > -1) {
          presentProductSeqLamp = result.data[i].productSeq;
        }
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
}
function getGnbList() {
  $.ajax({
    url: API_HOST + '/v2/gnb-menu/list',
    type: 'GET',
    async: false,
    cache: false,
    dataType: 'json',
    success: function (result) {
      if (result.meta.code === 200 && result.data) {
        let gnbItems = result.data;

        let nav =
          `<div class="inner-col">` +
          `<section class="nav-group">` +
          `<div class="nav-item"><div class="nav-close" onclick=\"document.querySelector('header').classList.remove('active');"><span><i class="blind">레이어 닫기</i></span></div>` +
          `<button onclick=\"document.querySelector('header').classList.add('active'); document.querySelector('header').classList.add('nav-mobile');"><span class="ico-hamburger"><i class="blind">hamburger menu</i></span></button>` +
          `<h1><a href="${yndUrl}" class="logo"><i class="blind">야나두</i></a></h1>` +
          `<nav><a href="${yndUrl}" class="logo"><i class="blind">야나두</i></a><ul>`;

        for (let item of gnbItems) {
          nav += `<li class="${
            item.iconType && item.iconType !== 'NONE' ? item.iconType.toLowerCase() : ''
          }"><a href="${item.link}" target="_${item.linkTarget.toLowerCase()}">${
            item.menuName
          }</a><ul>`;
          for (let sub of item.childGnbMenus) {
            nav += `<li class="${
              sub.iconType && sub.iconType === 'NEW' ? sub.iconType.toLowerCase() : ''
            }"><a href="${sub.link}"  target="_${sub.linkTarget.toLowerCase()}">${
              sub.menuName
            }</a></li>`;
          }
          nav += `</ul></li>`;
        }
        nav +=
          `</ul>` +
          `<div class="btn-app-download header-mobile">` +
          `<strong class="title">야나두 앱 바로가기</strong>` +
          `<button type="button" onclick="window.open('https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_android_download_288x288.png" alt=""></button>` +
          `<button type="button" onclick="window.open('https://itunes.apple.com/kr/app/id1539582420');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_ios_download_288x288.png" alt=""></button></div>` +
          `</nav ></div></section>` +
          `<section class="nav-global">` +
          `<a href="` +
          (isLoggedIn()
            ? `${yndUrl}/mypage/1`
            : `${yndUrl}/login?redirect=${encodeURIComponent(window.location.href)}`) +
          `"><span class="ico-user"><i class="blind">mypage</i></span></a>` +
          `</section></div>`;

        document.querySelector('header').innerHTML = nav;
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
}

let yndPopupImage = document.createElement('img');
let yndPopupLink = document.createElement('a');
let yndPopupSeq;

function yndModal() {
  fn_setPopupInfo();

  yndPopupImage.addEventListener('load', function () {
    if (getCookie('p_ynd_modal' + yndPopupSeq) !== 'done') {
      let modalImage = document.querySelectorAll('.ynd-modal-content')[0];
      let modalWidth = yndPopupImage.clientWidth;
      let modalHeight = yndPopupImage.clientHeight;
      if (navigator.userAgent.indexOf('9.0') === -1) {
        document.querySelector('body').classList.add('locked-modal');
      } else {
        document.querySelector('body').className += ' locked-modal';
      }
      modalImage.setAttribute('style', 'width:' + modalWidth + 'px; height:' + modalHeight + 'px;');
      $('.ynd-modal').css('visibility', 'visible');
    }
  });
}

function fn_setPopupInfo() {
  const popupPathname = encodeURIComponent(location.pathname);
  let node = document.createElement('div');

  if (popupPathname && popupPathname !== null && popupPathname !== '') {
    $.ajax({
      type: 'GET',
      url: API_HOST + '/v2/popup/current?pathname=' + popupPathname,
      dataType: 'json',
      cache: false,
      success: function (result) {
        if (result.meta.code === 200 && result.data) {
          node.classList.add('ynd-modal-wrap');
          document.querySelector('header').after(node);

          let yndModalContent =
            '<div class="ynd-modal">\n' +
            '   <div class="ynd-bg" onclick="yndModalClose();"></div>\n' +
            '       <div class="ynd-modal-content">\n' +
            '           <button type="button" class="ynd-close" onclick="yndModalClose();">close</button>\n' +
            '           <button type="button" id="btn_yndModalTodayClose" class="ynd-today-close"></button>\n' +
            '   </div>\n' +
            '</div>';

          document.querySelector('.ynd-modal-wrap').innerHTML = yndModalContent;

          yndPopupSeq = result.data.seq;
          yndPopupImage.src = result.data.image;
          const popupCloseType = result.data.closeType;
          const popupMoveLink = result.data.link && result.data.link;
          document.getElementById('btn_yndModalTodayClose').innerHTML = popupCloseType;

          if (popupMoveLink) {
            yndPopupLink.href = popupMoveLink;
            $('.ynd-modal-content').prepend(yndPopupLink);
            $(yndPopupLink).prepend(yndPopupImage);
          } else {
            $('.ynd-modal-content').prepend(yndPopupImage);
          }

          if (popupCloseType && popupCloseType !== '옵션 없음') {
            popupCloseType === '오늘 하루 열지 않기'
              ? $('.ynd-today-close').attr(
                  'onclick',
                  "yndModalCloseToday('p_ynd_modal" + yndPopupSeq + "', 1);"
                )
              : $('.ynd-today-close').attr(
                  'onclick',
                  "yndModalCloseToday('p_ynd_modal" + yndPopupSeq + "', 7);"
                );
          } else {
            $('.ynd-today-close').css('display', 'none');
          }
        }
      },
      error: function (data) {
        alert('다시 시도해주세요.');
      },
    });
  }
}

function yndModalCloseToday(cookies, date) {
  if (cookies == 'p_ynd_modal' + yndPopupSeq) {
    setCookieAt00(cookies, 'done', date);
    yndModalClose();
  }
}

function yndModalClose() {
  document.querySelector('.ynd-modal').setAttribute('style', 'visibility', 'hidden');
  if (navigator.userAgent.indexOf('9.0') === -1) {
    document.querySelector('body').classList.remove('locked-modal');
  } else {
    $('body').removeClass('locked-modal');
  }
}

// 페이스북 pixel용 사용자 추가 정보 세팅
let pixelCallRetryCount = 0;
(window['setPixelInfo'] = function () {
  if (!window.fbq && pixelCallRetryCount < 3) {
    pixelCallRetryCount++;
    setTimeout(function () {
      window.setPixelInfo();
    }, 3000);
    return false;
  }

  try {
    let userInfoString = getUserFromStorage();
    if (!userInfoString || typeof userInfoString !== 'string') {
      return;
    }
    let userInfo = JSON.parse(userInfoString);

    if (
      window.fbq?.getState &&
      Object.keys(window.fbq.getState().pixels[0]?.userData).length === 0 &&
      userInfo.pixelInfo
    ) {
      for (let pixel of window.fbq.getState().pixels) {
        window.fbq('init', pixel.id, userInfo.pixelInfo);
      }
    }
  } catch (e) {
    console.log(e);
  }
})();

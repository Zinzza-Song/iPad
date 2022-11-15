import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js';
import navigions from '../data/navigations.js'

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {

  event.stopPropagation(); // 이벤트 버블링 억제

  if (basketEl.classList.contains('show')) {
    //hide
    hideBasket();
  } else {
    // show
    showBasket();
  }
});
basketEl.addEventListener('click', function (event) {
  event.stopPropagation(); // 이벤트 버블링 억제
});

window.addEventListener('click', hideBasket);

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}


// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]; // 얕은 복사
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}
function playScroll() {
  document.documentElement.classList.remove('fixed');
}
function stopScroll() {
  document.documentElement.classList.add('fixed');
}

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', function() {
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});

//헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile');
});

//
window.addEventListener('resize', function() {
  if(window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
  } else {
    headerEl.classList.remove('searching--mobile');
  }
});

// 네비게이션 메뉴 모바일 버전
const navEl = document.querySelector('nav');
const navMenuTogglerEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuTogglerEl.addEventListener('click', function () {
  if(navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener('click', function (event) {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener('click', hideNavMenu);
window.addEventListener('click', hideNavMenu);

function showNavMenu() {
  navEl.classList.add('menuing');
}
function hideNavMenu() {
  navEl.classList.remove('menuing');
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});


// 비디오 제어
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function () {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});


// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += /* html */ `
    <li style="background-color: ${color}"></li>
    `;
  });

  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}">
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${(ipad.price).toLocaleString('en-us')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});


// 데이터 기반 네비게이션 표시
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `;

  navigationsEl.append(mapEl);
});

// 모바일 버전 네비게이션 표시 애니메이션
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click', function () {
    el.classList.toggle('active'); //add와 remove 역할을 동시에 함
  });
});

// 연도 표시
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();
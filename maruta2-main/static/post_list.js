const boxArea = document.querySelector(".boxArea");

const bottomBar = document.querySelectorAll(".bottomBar div");
const username = localStorage.getItem("username");

// 로그인하면 이름 로그인안하면 안뜨는 기능
if (username !== null) {
  usernameCreate();
} else {
  const name = document.querySelector("#name");
  name.innerText = "로그인하면 더 많은 서비스를 이용할 수 있어요!";
}

// text 자리에 글자 넣는 부분
function usernameCreate() {
  const name = document.querySelector("#name");
  name.innerText = `${username}님 안녕하세요.`;
}

// 스크롤 부분 기능
window.addEventListener("scroll", function () {
  if (window.scrollY == 0) {
    const nav = document.querySelector("nav");
    const a = this.document.querySelector("nav a");
    nav.classList.add("navOnscroll");

    nav.style.borderRadius = "0";
    nav.style.backgroundColor = "#fff";
    nav.style.backdropFilter = "blur(1px)";
  } else {
    const nav = document.querySelector("nav");
    const a = this.document.querySelector("nav a");
    nav.classList.add("navOnscroll");

    nav.style.backgroundColor = "rgba(160, 160, 160, 0.4)";
    nav.style.borderRadius = "50px";
    nav.style.backdropFilter = "blur(15px)";
    // 배경을 흐리게 만드는 부분
  }
  if (this.scrollY >= 150) {
    const nav = document.querySelector("nav");
    nav.style.top = "40px";
  } else {
    const nav = document.querySelector("nav");
    nav.style.top = "140px";
  }
});

// 설정바 부분
const memu = document.querySelector("#f1");

memu.addEventListener("mouseenter", function () {
  const b = document.querySelector("#f2");
  const c = document.querySelector("#f3");
  const d = document.querySelector("#f4");

  function onmouse(a) {
    a.style.transform = "scale(1.03)";
  }

  b.addEventListener("mouseenter", function () {
    onmouse(b);
  });
  c.addEventListener("mouseenter", function () {
    onmouse(c);
  });
  d.addEventListener("mouseenter", function () {
    onmouse(d);
  });

  b.style.top = "100px";
  c.style.top = "150px";
  d.style.top = "200px";

  setTimeout(re, 3000);
  function re() {
    b.style.top = "44px";
    c.style.top = "44px";
    d.style.top = "44px";
  }
});


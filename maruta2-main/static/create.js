const username = localStorage.getItem("username");
const namea = document.querySelector("#name");
// 로그인하면 이름 로그인안하면 안뜨는 기능

if (username != null) {
  namea.innerText = `${username}님 반가워요!`;
} else {
  namea.innerText = "로그인하면 더 많은 기능을 사용할 수 있어요!";
}

// 스크롤 부분 기능
window.addEventListener("scroll", function () {
    if (window.scrollY == 0) {
      const nav = document.querySelector("nav");
      nav.classList.add("navOnscroll");
  
      nav.style.borderRadius = "0px";
      nav.style.backgroundColor = "#fff";
      nav.style.backdropFilter = "blur(1px)";
    } else {
      const nav = document.querySelector("nav");
      nav.classList.add("navOnscroll");
  
      nav.style.backgroundColor = "rgba(140, 140, 140, 0.4)";
      nav.style.borderRadius = "50px";
      nav.style.backdropFilter = "blur(15px)"; /* 배경을 10px로 흐리게 만듦 */
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


const boxArea = document.querySelector(".boxArea");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bottomBar = document.querySelectorAll(".bottomBar div");
let d = 0;
const username = localStorage.getItem("username");
const namea = document.querySelector("#name");
const firstdiv = document.querySelector(".bottomBar div");

firstdiv.style.backgroundColor = "rgb(94, 94, 94)";
// 로그인하면 이름 로그인안하면 안뜨는 기능

if (username != null) {
  namea.innerText = `${username}님 반가워요!`;
} else {
  namea.innerText = "로그인하면 더 많은 기능을 사용할 수 있어요!";
}

function bar() {
  bottomBar.forEach((div) => {
    div.style.backgroundColor = "rgb(177, 177, 177)";
  });
  if (d == 0) {
    const a = bottomBar[0];
    a.style.backgroundColor = "rgb(94, 94, 94)";
  } else if (d == -350) {
    const a2 = bottomBar[1];
    a2.style.backgroundColor = "rgb(94, 94, 94)";
  } else if (d == -700) {
    const a3 = bottomBar[2];
    a3.style.backgroundColor = "rgb(94, 94, 94)";
  }
}

function moveLeft() {
  if (d == 0) {
    left.style.color = "red";
    setTimeout(white, 1000);
    function white() {
      left.style.color = "black";
    }
  } else {
    const Currentd = d + 350;
    boxArea.style.left = `${Currentd}px`;
    console.log(Currentd);
    return (d += 350);
  }
}
function moveRight() {
  if (d == -700) {
    right.style.color = "red";
    setTimeout(white, 1000);
    function white() {
      right.style.color = "black";
    }
  } else {
    const Currentd = d - 350;
    boxArea.style.left = `${Currentd}px`;
    console.log(Currentd);
    return (d -= 350);
  }
}

left.addEventListener("click", moveLeft);
right.addEventListener("click", moveRight);

left.addEventListener("click", bar);
right.addEventListener("click", bar);

// 로그인하면 이름 로그인안하면 안뜨는 기능

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

<<<<<<< HEAD
    nav.style.backgroundColor = "rgba(140, 140, 140, 0.4)";
    nav.style.borderRadius = "50px";
    nav.style.backdropFilter = "blur(15px)"; /* 배경을 10px로 흐리게 만듦 */
  }
  if (this.scrollY >= 150) {
    const nav = document.querySelector("nav");
    nav.style.top = "40px";
=======
    nav.style.backgroundColor = "rgba(180, 180, 180, 0.4)";
    nav.style.borderRadius = "50px";
    nav.style.backdropFilter = "blur(15px)"; /* 배경을 10px로 흐리게 만듦 */
  }
  if (this.scrollY >= 120) {
    const nav = document.querySelector("nav");
    nav.style.top = "20px";
>>>>>>> origin/main
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
  

  function onmouse(a) {
    a.style.transform = "scale(1.03)";
  }

  b.addEventListener("mouseenter", function () {
    onmouse(b);
  });
  c.addEventListener("mouseenter", function () {
    onmouse(c);
  });

  b.style.top = "100px";
  c.style.top = "150px";

  setTimeout(re, 3000);
  function re() {
    b.style.top = "44px";
    c.style.top = "44px";
  }
});

boxArea.addEventListener("mouseover", function () {
  const moveBtnleft = document.querySelector(".left");
  const movebtnRight = document.querySelector(".right");

  moveBtnleft.style.backdropFilter = "blur(10px)";
  movebtnRight.style.backdropFilter = "blur(10px)";

  moveBtnleft.style.backgroundColor = "rgba(230,230,230,0.2)";
  movebtnRight.style.backgroundColor = "rgba(230,230,230,0.5)";
});

boxArea.addEventListener("mouseout", function () {
  const moveBtnleft = document.querySelector(".left");
  const movebtnRight = document.querySelector(".right");

  moveBtnleft.style.backdropFilter = "blur(3px)";
  movebtnRight.style.backdropFilter = "blur(3px)";

  moveBtnleft.style.backgroundColor = "rgba(255,255,255,0.1)";
  movebtnRight.style.backgroundColor = "rgba(255,255,255,0.1)";
});

const Btn = document.querySelector(".btn-area");

Btn.addEventListener("mouseover", function () {
  const moveBtnleft = document.querySelector(".left");
  const movebtnRight = document.querySelector(".right");

  moveBtnleft.style.backdropFilter = "blur(10px)";
  movebtnRight.style.backdropFilter = "blur(10px)";

  moveBtnleft.style.backgroundColor = "rgba(230,230,230,0.2)";
  movebtnRight.style.backgroundColor = "rgba(230,230,230,0.5)";
});

Btn.addEventListener("mouseout", function () {
  const moveBtnleft = document.querySelector(".left");
  const movebtnRight = document.querySelector(".right");

  moveBtnleft.style.backdropFilter = "blur(3px)";
  movebtnRight.style.backdropFilter = "blur(3px)";

  moveBtnleft.style.backgroundColor = "rgba(255,255,255,0.1)";
  movebtnRight.style.backgroundColor = "rgba(255,255,255,0.1)";
});

function deleteLocal(item,a,b){
  localStorage.removeItem(item);
  localStorage.removeItem(a);
  localStorage.removeItem(b);
}

const logOutBtn = document.querySelector("#f3");

logOutBtn.addEventListener("click", (event)=>{
  event.preventDefault();
  deleteLocal("classname","username","token");
  window.location.href="/";
})
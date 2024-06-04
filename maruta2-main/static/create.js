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
  
      nav.style.backgroundColor = "rgba(180, 180, 180, 0.4)";
      nav.style.borderRadius = "50px";
      nav.style.backdropFilter = "blur(15px)"; /* 배경을 10px로 흐리게 만듦 */
    }
    if (this.scrollY >= 120) {
      const nav = document.querySelector("nav");
      nav.style.top = "20px";
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

const createContent = document.querySelector("#create-Content");
const nickname = document.querySelector("#nickname");
const password = document.querySelector("#password");
const contentText = document.querySelector("#contentText");
const title = document.querySelector("#title");
let num1 =0;
let num2=0;
let num3=0;
let num4=0;


function checkInput(a,b,c,d){
  a.addEventListener("input",()=>{
    const q = a.value.length;
    return num1 = q, e()
  })
  b.addEventListener("input",()=>{
    const w = b.value.length;
    return num2 = w, e()
  })
  c.addEventListener("input",()=>{
    const h = c.value.length;
    return num3 = h, e()
  })
  d.addEventListener("input",()=>{
    const r = d.value.length;
    return num4 = r, e()
  })
  function e(){
    console.log(num1,num2,num3,num4);
    const admin = document.querySelector("#byText");
    if(num1>=1&&num2>=1&&num3>=1&&num4>=1){
      admin.disabled = false;
      admin.style.backgroundColor = "#e37676";
    }else{
      admin.disabled = true;
      admin.style.backgroundColor = "rgb(161,161,161);"
    }
  }
}

checkInput(nickname,password,title,contentText)

const reset = document.querySelector("#reset");
reset.addEventListener("click", ()=>{
  num1 = 0;
  num2 = 0;
  num3 = 0;
  num4 = 0; 
  function e(){
    console.log(num1,num2,num3,num4);
    const admin = document.querySelector("#byText");
    admin.disabled = true;
    admin.style.backgroundColor = "rgb(161,161,161);";
  }
  e();
})
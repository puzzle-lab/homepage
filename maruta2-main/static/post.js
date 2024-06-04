const recommand = document.querySelector(".recommand form");
const currentUrl = window.location.href;


document.addEventListener("DOMContentLoaded", function() {
  const classNumber = localStorage.getItem("classname");
  const data ={
    classnumber: classNumber,
  }
  
  fetch(`${currentUrl}/like`, {
    method: "post",
    headers: {
      "Content-Type": "application/Json",
    },
    body: JSON.stringify(data),
  })
  .then((res)=>{
    return res.json();
  })
  .then((data)=> {
    if(data.like == "true"){
      const a = document.querySelector(".recommandbtn");
      a.style.backgroundColor="blue";
    }else if(data.like == "false"){
      const a = document.querySelector(".recommandbtn");
      a.style.backgroundColor="#a0a0a0";
      a.style.color="#dadada";
    }else{
      const a = document.querySelector(".recommandbtn");
      a.style.backgroundColor="white";
    }
  });
});

const imgArea =document.querySelector(".imgArea");
const h = imgArea.src;

if(h.substring(h.length - 4)=="None"){
  console.log("dd");
  const hh = document.querySelector(".hh");
  imgArea.remove();
  hh.innerHTML=`<img class="imgArea" src="https://i.namu.wiki/i/_ePFzzXCg1C9Gp7QAqW752d3pPxQacLN6rqw1Yw9vnjPANOJVSpbXNULvCz2Fh6ThnAVGge5A-NUlD4RHifODC4Vor7JuNeHCpdBMVNJOTMFdw9tFE-saSSYehJHcaa8JcHtZbe3kxJ1eZ6bBnJzPA.svg" alt="Post image"/style="width:150px;">`;
}

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

    nav.style.backgroundColor = "rgba(180, 180, 180, 0.4)";
    nav.style.borderRadius = "50px";
    nav.style.backdropFilter = "blur(15px)";
    // 배경을 흐리게 만드는 부분
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


const createArea = document.querySelector(".createrAreaPw form");

createArea.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#contentpw");
  const pw = input.value;
  const data = {
    password: pw,
  };

  // url 입력해줘 자기야
  fetch(`${currentUrl}/password`, {
    method: "post",
    headers: {
      "Content-Type": "application/Json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("ok");
      return res.json();
    })
    .then((data) => {
      if (data.result == "true") {
        console.log("aa");
        const a = document.querySelector(".createrArea");
        a.style.display = "flex";
      } else {
        alert("글 비밀번호를 다시 확인해보세요.");
      }
    });
});


recommand.addEventListener("submit", function(event){
  event.preventDefault();
  const classNumber = localStorage.getItem("classname");
  const data ={
    classnumber: classNumber,
  }

  fetch(`${currentUrl}/recommand`, {
    method: "post",
    headers: {
      "Content-Type": "application/Json",
    },
    body: JSON.stringify(data),
  })
  .then((res)=>{
    console.log(res);
    return res.json();
  })
  .then((data)=> {
    if(data.result == "true"){
      const a = document.querySelector(".recommandbtn");
      a.style.backgroundColor="blue";
      location.replace(currentUrl);
    }else if(data.result == "false"){
      const a = document.querySelector(".recommandbtn");
      a.style.backgroundColor="black";
      location.replace(currentUrl);
    }
  });
});




// 추천기능
// 한 계정당 한번만 추천가능하게

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

const jb = document.querySelector(".jb");
jb.addEventListener("click",(event)=>{
  event.preventDefault();
  const jj = document.querySelector(".createrAreaPw");
  if(jj.style.display =="flex"){
    jj.style.display = "none";
  }else{
    jj.style.display = "flex";
  }
})


const nickname = document.querySelector("#nickname");
const password = document.querySelector("#textpw");
const review = document.querySelector("#review");
let num1=0;
let num2=0;
let num3=0;

function checkInput(a,b,c){
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
  
  function e(){
    console.log(num1,num2,num3);
    const writetext = document.querySelector("#writetext");
    if(num1>=1&&num2>=1&&num3>=1){
      writetext.disabled = false;
      writetext.style.backgroundColor = "#e37676";
    }else if(num1==0|num2==0|num3==0){
      writetext.disabled = true;
      writetext.style.backgroundColor = "#808080;";
    }
  }
};

checkInput(nickname,password,review);
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const d = document.querySelector("#d");
const e = document.querySelector("#e");
const f = document.querySelector("#f");
const g = document.querySelector("#g");
const num = document.querySelector(".num");
const username = document.querySelector(".name");
const password = document.querySelector(".pw");
const checkPassword = document.querySelector(".pw1");

const userInf = {
    classnumber : undefined,
    username: undefined,
    password1: undefined,
    password: undefined
};

// 첫시작 부분
setTimeout(onload, 1000)
function onload(){
    firstText("안녕하세요!");
}


function firstText(text){
    const h1 = a.querySelector("h1");
    h1.innerText = text;
    h1.style.color= "black";
    setTimeout(removeText, 1500)
        function removeText(){
            h1.style.color = "white";
            setTimeout(firstInput, 1500)
            function firstInput(){ 
                a.classList.add("hidden");
                b.classList.remove("hidden");
                setTimeout(oninput, 500)
                function oninput(){
                    b.style.opacity = 1;
                }
            }
        }
    
}
// 여기까지 시작부분 

// 학번 받는 부분
function nextForm(event){
    event.preventDefault();
    const num = document.querySelector("#num");
    const classnumber = num.value;
    console.log(classnumber);
    userInf.classnumber = classnumber;
    // input의 내용물 저장
    b.style.opacity = 0;
    setTimeout(onInput ,1500)
    function onInput(){
        b.classList.add("hidden");
        c.classList.remove("hidden");
        setTimeout(oninput, 500)
        function oninput(){
        c.style.opacity = 1;
        }
    }    
}
// 여기까지 학번 받는부분


// username 받는 부분
function usernameCheck(event){
    event.preventDefault();
    c.style.opacity = 0;
    // 이름 받기

    const userName = c.querySelector("input");
    const name = userName.value;
    console.log(name);
    userInf.username = name;

    setTimeout(onInput, 1500)
    function onInput(){
        c.classList.add("hidden");
        d.classList.remove("hidden");
        const h1 = d.querySelector("h1");
        h1.innerText = `${name}님 반가워요!`;
        h1.style.fontSize = "35px";
        setTimeout(removeText, 2000)
        function removeText(){
            h1.style.color= "black";
            setTimeout(firstInput, 1500)
            function firstInput(){ 
                h1.style.color = "white";
                setTimeout(passwordInput, 1500);
                function passwordInput(){
                    d.classList.add("hidden");
                    e.classList.remove("hidden");
                    setTimeout(oninput, 500)
                    function oninput(){
                        e.style.opacity = 1;
                    } 
                }  
            }
        }
    }
}
// 여기까지 username

// password 받는 부분
function passwordCheck(event){
    event.preventDefault();
    const pass = e.querySelector("#pw");
    const pass1 = pass.value;
    console.log(pass1);
    userInf.password1 = pass1;
    // input의 내용물 저장
    e.style.opacity = 0;
    setTimeout(onInput ,1500)
    function onInput(){
        e.classList.add("hidden");
        f.classList.remove("hidden");
        f.style.fontSize = "30px";
        setTimeout(oninput, 500)
        function oninput(){
        f.style.opacity = 1;
        }
    }    
}
// 여기까지 password

function checkpass(event){
    event.preventDefault();
    const repass = checkPassword.querySelector("#pw1");
    const rePass = repass.value;
    if(rePass === userInf.password1){
        console.log("동일합니다.");
        f.style.opacity = 0;
        userInf.password = rePass;
        delete userInf.password1;
        setTimeout(last, 1500)
        function last(){
            f.classList.add("hidden");
            g.classList.remove("hidden");
            const h1 = g.querySelector("h1");
            h1.style.fontSize="30px";
            h1.innerText = `${userInf.username}님 가입을 축하합니다.\n잠시 기다려주세요.\n-일간베스트 일동-`;
            setTimeout(lastText,1000)
            function lastText(){
                h1.style.color = "black";
                setTimeout(login, 2000)
                function login(){
                // 용민이랑 반환값 쓰기.
                    fetch("/sign_in",{
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userInf),
                    })
                    .then((res) => {
                        console.log(res);
                        return res.json();
                    })
                    .then((ko) =>{
                        console.log(ko);
                        if(ko.result=="success"){
                        window.location.href = "/";
                        }else{
                        alert("비밀번호 생각해봐라 씨발아");
                        }
                    });
                }
            }
        }
    }
}


checkPassword.addEventListener("submit", checkpass);
num.addEventListener("submit", nextForm);
username.addEventListener("submit", usernameCheck);
password.addEventListener("submit", passwordCheck);


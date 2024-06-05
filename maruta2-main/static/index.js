const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const formArea = document.querySelector(".login-form");

// data는 변수•••••
function login(event) {
  event.preventDefault();

  const data = {
    classnumber: id.value,
    password: pw.value,
  };
  console.log(data);
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if(data.ok === true){
        localStorage.setItem("token",data.access_token);
        localStorage.setItem("classname",id.value);
        localStorage.setItem("username",data.username);
        location.href="/main";
      }else{
       alert(" 로그인 정보를 다시 확인해보세요.");
      }
    });
}

formArea.addEventListener("submit", login);

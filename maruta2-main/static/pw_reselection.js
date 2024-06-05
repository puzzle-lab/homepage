
const createpw = document.querySelector("#newpw");
const username = document.querySelector("#username");
const classnumber = document.querySelector("#classnumber");
const o = document.querySelector(".checkinf input");
const k = document.querySelector("#k");
createpw.disabled = true;
k.disabled = true;

checkinf.addEventListener("click", function(event){
    event.preventDefault();

    const data = {
    username: username.value,
    classnumber: classnumber.value,
    };
    console.log(data);
  fetch("/check_id", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return res.json();
  })
  .then((data)=>{
    if(data.result === "success"){
        console.log(data);
        o.value = "인증완료";
        o.style.backgroundColor="#3CB371";
        createpw.disabled = !createpw.disabled;
        k.disabled = !k.disabled;
    }else{
        console.log(data)
        o.style.backgroundColor ="#CF2F11";
        o.value = "인증실패";
        setTimeout(a,1500)
        function a(){
          o.style.backgroundColor ="rgba(201, 197, 197, 0.856)";
          o.value = "인증하기";
        }
    }
  });
})

const newpw = document.querySelector(".newpw");
const inputPass = document.querySelector("#newpw")
const inputPassword = inputPass.value;
// submit == const k

function createPassword(event){
  event.preventDefault();

  const data = {
    username: username.value,
    password: inputPass.value,
  };
  fetch("/pw_reselection", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res)=>{
    console.log(res);
    console.log(res.result);
    return res.json();
  })
  .then((data) => {
    if(data.result == "Success"){
      console.log(data);
      window.location.href = "/";
    }else{
      console.log("no");
    }
  });
}

newpw.addEventListener("submit",createPassword)
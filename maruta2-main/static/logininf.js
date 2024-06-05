const loginInf = localStorage.getItem("username");

if(loginInf ==null){
    window.location.href="/";
}
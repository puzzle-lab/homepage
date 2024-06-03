

let formDeletePairs = [];

window.onload = function() {
    let forms = document.querySelectorAll('.test');
    let formsArray = Array.from(forms);

    let deleteBtns = document.querySelectorAll('.deleteBtn');
    let deleteBtnArray = Array.from(deleteBtns);

    for (let i = 0; i < formsArray.length; i++) {
        formDeletePairs.push({
            form: formsArray[i],
            deleteBtn: deleteBtnArray[i]
        });
        formsArray[i].addEventListener('submit', handleFormSubmit)
    }
}


// 폼 제출 처리 함수
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const parentElement = form.parentNode;
    const bb =parentElement.querySelector(".deleteBtn");
    const bbb = bb.querySelector("input");  
    
    const aaa = form.querySelector(".inputv");
    console.log(aaa.value);
    const c = form.querySelector(".inputvB");
    const currentUrl = form.action;
    
    const data ={
        password: aaa.value,
    }
    console.log(data);
    fetch(`${currentUrl}`, {
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
            console.log(c);
            c.style.backgroundColor = "#3CB371";
            c.value = "인증완료";
            bb.style.display = "flex";
            bbb.disabled = false;
        }else if(data.result == "false"){
            alert("댓글 비밀번호를 다시 확인해보세요!");
        }
      });
}




let formDeletePairs = [];

window.onload = function() {
    // 폼 요소를 배열로 변환
    let forms = document.querySelectorAll('.test');
    let formsArray = Array.from(forms);

    // 삭제 버튼 요소를 배열로 변환
    let deleteBtns = document.querySelectorAll('.deleteBtn');
    let deleteBtnArray = Array.from(deleteBtns);

    // 폼 요소와 삭제 버튼 요소를 묶어서 객체의 배열에 저장
    for (let i = 0; i < formsArray.length; i++) {
        formDeletePairs.push({
            form: formsArray[i],
            deleteBtn: deleteBtnArray[i]
        });

        // 각 폼 요소에 이벤트 리스너 추가
        formsArray[i].addEventListener('submit', handleFormSubmit)
    }
    
    // 배열 출력 예시
    console.log(formDeletePairs);
}


// 폼 제출 처리 함수
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const parentElement = form.parentNode;
    const bb =parentElement.querySelector(".deleteBtn");
    const bbb = bb.querySelector("input");  
    console.log(bb);
    // 폼 데이터 처리 또는 다른 동작 수행
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
            bbb.disabled = false;
        }else if(data.result == "false"){
            alert("댓글 비밀번호를 다시 확인해보세요!");
        }
      });
}


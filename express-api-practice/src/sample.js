// img를 넣을 태그
const content = document.querySelector(".content")
// fetch()를 통해 괄호 안 url의 데이터를 변수에 저장
const item = fetch("http://localhost:3000/homeContents.json")
    // fetch API는 promise를 기반함
    // then 메소드로 fetch의 반환값 res를 받아 이를 json 형태로 변환
    .then((response)=>response.json())
    // 받은 data를 innerHTML한다
    .then((data) => {
        console.log(data.home.promoCards[0].image)

        content.innerHTML = `<img src="${data.home.promoCards[1].image}">`
    })
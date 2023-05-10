// Express를 import load하여 모듈을 제어
const express = require("express");

// app변수에 선언하여 어플리케이션 생성
const app = express()

// 포트 지정
const port = 3000;

//// 미들웨어
// client가 / 경로에 get 요청을 보내면
// req는 요청객체, res는 응답객체
app.get("/", (req, res) => {
    // 응답 콜백 함수
    res.send("Hello World!")
})

//// 미들웨어
// port에 접속 성공하면 콜백함수 실행
app.listen(port, () => {
    console.log(`포트 ${port} 연결 성공`)
})
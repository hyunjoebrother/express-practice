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
    // res.send("Hello World!")
    // __dirname : 절대경로
    res.sendFile(__dirname+"/src/index.html")
})

//// POST 작업
// 먼저 import
const bodyParser = require("body-parser")

//// 미들웨어
// 브라우저에서 오는 응답이 JSON이 아닐수도 있으니 urlencoded() 추가
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post("/post", (req, res) => {
    // 브라우저에서 받은 데이터는 req.body에 저장
    res.send("<h1>성공</h1>" + req.body.input)
})

//// 정적폴더를 지정하는 미들웨어 추가
app.use(express.static('src'));

//// fetch API ajax 작업
// fs모듈 import (file-system)
const fs = require("fs")
let homeContents = {}

// data 폴더 안에 있는 json파일들을 파싱하여 객체 안에 넣는다
homeContents = JSON.parse(
    fs.readFileSync(__dirname+"/src/data/homeContents.json", "utf-8")
);

app.get("/homeContents.json", (req, res, next) => {
    res.json(homeContents)
})


//// JSON 데이터 fetch test
fetch("http://localhost:3000/homeContents.json").then((response) => response.json())
.then((data) => console.log(data.home.promoCards[0].image))



//// 미들웨어
// port에 접속 성공하면 콜백함수 실행
app.listen(port, () => {
    console.log(`포트 ${port} 연결 성공`)
})
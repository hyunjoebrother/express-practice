//// Express Server 설정하기
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const axios = require('axios');
const qs = require('qs')
const session = require('express-session')


//// nunjucks 세팅
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

//// session 세팅 - 세션 설정할 때 쿠키가 생성된다
// 카카오에서 던져주는 토큰 저장
app.use(session({
    secret: 'secret-session',
    resave: true,
    secure: false,
    saveUninitialized: false,
}))


//// kakao 객체 생성
// 카카오톡 개발자 페이지
const REST_API = '6210843e8568ac0e6b6e04437cdd491b' // 카카오에서 받은 client ID
const secret_key = 'j1sJYYqdfSYKtPzG7I4GdZiqYUXGraHH'
const redirect_uri = 'http://localhost:3000/auth/kakao/callback' //여기서 지정한 포트가 아니면 모두 에러
// Redirect URI란, 카카오 서버와 우리의 서버가 토큰과 정보를 주고 받을 때 우리 서비스에서 그 정보를 받는 페이지

const kakao = {
    clientID: REST_API,
    clientSecret: secret_key,
    redirectUri: redirect_uri
}


//// 메인 페이지
app.get('/', (req, res) => {
    const {msg} = req.query;
    res.render('index.html', {
        msg, logininfo: req.session.authData,
    })
})


//// 카카오 로그인 페이지 연결
// 1. 인가코드 받기를 요청(GET), Host : kauth.kakao.com
// 카카오 로그인 등의 화면을 호출하고, 사용자 동의를 거쳐 인가 코드를 발급
// 동의 화면은 앱에 설정된 동의 항목에 대해 사용자에게 인가(동의)를 구함
// 인가 코드는 동의 화면을 통해 인가받은 동의 항목 정보를 갖고 있으며, 인가 코드를 사용해 토큰 받기를 요청할 수 있음
app.get('/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=account_email`;
    res.redirect(kakaoAuthURL);
})


app.get('/auth/kakao/callback', async(req, res) => {
    // axios => promise project
    // access 토큰을 받기 위한 코드
    try {
        token = await axios({ // 토큰
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
                grant_type: 'authorization_code', // 특정 스트링
                client_id: kakao.clientID,
                client_server: kakao.clientSecret,
                redirectUri: kakao.redirectUri,
                code, // 객체를 string으로 변환
            })
        })
    } catch(error) {
        res.json(error.data)
    }

    // access 토큰을 받아서 사용자 정보를 알기 위해 쓰는 코드
    let user;
    try {
        console.log(token); // access 정보를 가지고 또 요청해야 정보를 가져올 수 있음.
        user = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                // get값에 토큰을 보내려면 위험하니 헤더에 넣어서 보낸다.
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    } catch(error) {
        res.json(error.data);
    }
        console.log(user)
        req.session.kakao = user.data;
        res.send('success')

})

//// 회원정보

app.get('/auth/info', (req, res) => {
    let {nickname, profile_image} = req.session.kakao.properties;
    res.render('info', {
        nickname, profile_image,
    })
})

app.get(kakao.redirectUri)

app.listen(3000, () => {
    console.log('server start 3000')
})
const http = require('http');

// HTTP 서버 객체 생성
const server = http.createServer();


// 회원가입 유저 정보
const users = [
    {
        id: 1,
        name: 'Mei',
        email: 'mei@gmail.com',
        password: '980831',
    },
    {
        id: 2,
        name: 'Boo',
        email: 'seventeen17@pledis.com',
        password: '171717',
    }
]

// 게시글 정보
const posts = [
    {
        id: 1,
        title: '세븐틴 초동 455만 역대 기록!',
        description: '9년차 아이돌의 엄청난 성장 아주 멋져요. 올해 대상각 보여 기대중',
        userId: 1,
    },
    {
        id: 2,
        title: '아 우리 부승관, 귀여워서 미안해',
        description: '항상 응원해',
        userId: 1,
    },
];



// HTTP 요청(이벤트)이 발생하면 실행되는 Listener(함수) 정의
const httpRequestListener = function(request, response) {
    const {url, method} = request; // request 객체에서 url, http_method 정보 추출해서 변수에 할당
    if (method === 'GET') { // 어떤 http method인지, target 어디인지 판별
        if(url === '/ping') {
            response.writeHead(200, { // http status code, 오류 없이 서버에서 처리가 정상적이면 200코드를 담아서 응답헤더 설정
                "Content-Type": "application/json" // 응답 body에 담기는 컨텐츠의 타입이 json형식임을 정의
            }); 
            response.end(JSON.stringify({message: 'pong'})); // 객체를 응답 body에 담아서 client에 반환
        }
    } // 회원가입
    else if (method === 'POST') {
        if(url === '/users') {
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            // stream을 전부 받아온 이후에 실행
            request.on('end', ()=>{
                const user = JSON.parse(body);

                users.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                response.writeHead(200, {
                    "Content-Type": "application/json"
                }); 
                response.end(JSON.stringify({ message: 'lollol' }));
            });
        }
    };
};

// http request가 발생하면 httpRequestListener 함수가 실행될 수 있도록
// request 이벤트에 httpRequestListener 함수 등록
server.on("request", httpRequestListener); // request 객체 : 요청을 보낸 client와 관련한 data가 담겨있는 객체

// HTTP server 실행 - server.listen 메소드로 Node.js에서 client의 요청 수신을 대기하도록 서버 실행
server.listen(8000, '127.0.0.1', function() {
    console.log('port 8000에 접속 완료했습니다')
})

// $node app.js

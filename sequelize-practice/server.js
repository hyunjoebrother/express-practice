//// Express Server

const express = require('express');
const path = require('path')
const morgan = require('morgan')

const {sequelize} = require('./models')

const app = express();
app.set('port', process.env.PORT || 3306)

sequelize.sync({force: false}).then(()=>{
    console.log('데이터베이스 연결 성공')
}).catch((error)=>{
    console.log(error)
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '빈 포트에서 대기 중')
})
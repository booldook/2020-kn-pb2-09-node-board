/** 전역변수 **********************/
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const error = require('http-errors');
const session = require('./modules/session-conn');
const morgan = require('./modules/morgan-conn');
const local = require('./modules/local-conn');

/** 라우터 등록 **********************/
const testRouter = require('./routes/test');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

/** 서버실행 **********************/
app.listen(process.env.PORT, () => {
	console.log('=====================');
	console.log('http://127.0.0.1:'+process.env.PORT);
	console.log('=====================');
});

/** 초기설정 **********************/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan());
app.use(session());
app.use(local());



/** 라우터설정 **********************/
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/upload', express.static(path.join(__dirname, './storage')));
app.use('/test', testRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);

/** 에러 처리 **********************/
app.use((req, res, next) => {
	next(error(404, 'Page Not Found - 페이지를 찾을 수 없습니다.'));
});

app.use((err, req, res, next) => {
	const pug = {
		img : err.status == 404 ? err.status : 500, 
		code : err.status || 500,
		msg	: err.message || 'Unexpected Error'
	}
	res.render('error/error.pug', pug);
});


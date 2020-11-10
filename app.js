/** 전역변수 **********************/
const express = require('express');
const app = express();
const path = require('path');

/** 라우터 등록 **********************/
const testRouter = require('./routes/test');
const bookRouter = require('./routes/book');
const errorRouter = require('./routes/error');

/** 서버실행 **********************/
app.listen(3000, () => {
	console.log('=====================');
	console.log('http://127.0.0.1:3000');
	console.log('=====================');
});

/** 초기설정 **********************/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

/** 라우터설정 **********************/
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/test', testRouter);
app.use('/book', bookRouter);

/** 에러 처리 **********************/
app.use(errorRouter);
app.use((err, req, res, next) => {
	const pug = {
		src : err.src ? err.src : 500,
		code : err.code ? err.code : 'UNEXPECTED ERROR',
		msg: err.msg ? err.msg: '예기치 않은 에러가 발생하였습니다.'
	}
	res.render('error/error.pug', pug);
});


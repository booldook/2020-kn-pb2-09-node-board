const middleWare = (req, res, next) => {
	console.log('미들웨어 에요');
	next();
}

const middleWare2 = (value) => {
	return (req, res, next) => {
		console.log(value + ' 이에요~');
		next();
	}
}

app.get('/multer', middleWare, middleWare2('booldook'), (req, res, next) => {
	res.render('multer/write.pug');
});

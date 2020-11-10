const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
	const err = new Error();
	err.src = 404;
	err.code = 'Page Not Found';
	err.msg = '페이지를 찾을 수 없습니다.';
	next(err);
});

module.exports = router;
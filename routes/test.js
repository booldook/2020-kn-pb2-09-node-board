const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	// res.send('FIRST');
	const err = new Error();
	next(err);
});

router.get('/', (req, res, next) => {
	res.send('SECOND');
});

router.get('/sample', (req, res, next) => {
	res.send('<h1>/TEST/SAMPLE</h1>');
});

module.exports = router;
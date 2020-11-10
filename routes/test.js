const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('error/error.pug');
});

router.get('/sample', (req, res) => {
	res.send('<h1>/TEST/SAMPLE</h1>');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const error = require('http-errors');
const bcrypt = require('bcrypt');
const { pool, sqlGen } = require('../modules/mysql-conn');

router.get('/join', (req, res, next) => {
	const pug = { 
		file: 'user-join', 
		title: '회원 가입',
		titleSub: '다양한 혜택을 위해 회원에 가입하세요~'
	}
	res.render('user/join', pug);
});

router.post('/save', async (req, res, next) => {
	try {
		req.body.userpw = await bcrypt.hash(req.body.userpw + process.env.BCRYPT_SALT, Number(process.env.BCRYPT_ROUND));
		let rs = await sqlGen('users', 'I', {
			field: ['userid', 'userpw', 'username', 'email'],
			data: req.body
		});
		res.json(rs[0]);
	}
	catch(e) {
		next(error(500, e.sqlMessage || e));
	}
});


router.get('/idchk/:userid', async (req, res, next) => {
	let rs;
	try {
		rs = await sqlGen('users', 'S', {where: ['userid', req.params.userid]});
		if(rs[0].length > 0)
			res.json({ code: 200, isUsed: true });
		else
			res.json({ code: 200, isUsed: false });
	}
	catch(e) {
		res.json({code: 500, error: e.sqlMessage || e});
	}
});

module.exports = router;
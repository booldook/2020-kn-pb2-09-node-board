const express = require('express');
const router = express.Router();
const error = require('http-errors');
const bcrypt = require('bcrypt');
const { pool, sqlGen } = require('../modules/mysql-conn');
const { alert } = require('../modules/util');

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
		if(rs[0].affectedRows == 1) 
			res.send(alert('회원가입이 완료되었습니다. 로그인 해 주세요.', '/user/login'));
		else
			res.send(alert('회원가입이 실패하였습니다. 다시 시도해 주세요.', '/user/join'));
	}
	catch(e) {
		next(error(500, e.sqlMessage || e));
	}
});

router.get('/login', (req, res, next) => {
	const pug = { 
		file: 'user-login', 
		title: '회원 로그인',
		titleSub: '회원 로그인 후 서비스를 이용하세요~'
	}
	res.render('user/login', pug);
});

router.post('/logon', async (req, res, next) => {
	try {
		let rs = await sqlGen('users', 'S', {
			field: ['userid'], where:['userid', req.body.userid]
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
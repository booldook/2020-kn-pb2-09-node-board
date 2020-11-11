const express = require('express');
const router = express.Router();
const moment = require('moment');
const { pool } = require('../modules/mysql-conn');
const { alert } = require('../modules/util');

router.get(['/', '/list'], async (req, res, next) => {
	let sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 0, 5';
	let connect, r;
	try {
		connect = await pool.getConnection();
		r = await connect.query(sql);
		connect.release();

		for(let v of r[0]) v.wdate = moment(v.wdate).format('YYYY-MM-DD');
		const pug = {
			file: 'book-list',
			title: '도서 리스트',
			titleSub: '고전도서 리스트',
			lists: r[0]
		}
		res.render('book/list', pug);
	}
	catch(e) {
		connect.release();
		next(e);
	}
});

router.get('/write', (req, res, next) => {
	const pug = {
		file: 'book-write',
		title: '도서 작성',
		titleSub: '등록할 도서를 작성하세요.',
	}
	res.render('book/write', pug);
});

router.post('/save', async (req, res, next) => {
	const { title, writer, wdate, content } = req.body;
	const values = [title, writer, wdate, content];
	const sql = 'INSERT INTO books SET title=?, writer=?, wdate=?, content=?';

	const connect = await pool.getConnection();
	const r = await connect.query(sql, values);
	connect.release();

	res.redirect('/book/list');
});

// DELETE FROM books WHERE id=1 OR id=2 OR id=3;
router.get('/delete/:id', async (req, res, next) => {
	try {
		var sql = `DELETE FROM books WHERE id=${req.params.id}`;
		const connect = await pool.getConnection();
		const rs = await connect.query(sql);
		if(rs[0].affectedRows > 0) {
			res.send(alert('삭제되었습니다.', '/book'));
		}
	}
	catch(e) {
		next(e);
	}
});

module.exports = router;













/*
app.get('/book/list', (req, res) => {
	pool.getConnection((e, connect) => {
		connect.query('SELECT * FROM books', (e, r) => {
			connect.query('SELECT * FROM books', (e, r) => {
				connect.release();
				const pug = {
					css: 'book-list',
					js: 'book-list',
					title: '도서 리스트',
					titleSub: '고전도서 리스트',
					lists: r
				}
				res.json(r);
				//res.render('book/list', pug);
			})
		});
	});
});
*/




/*
// Callback Version : 앞으로 쓰지 않는다.
app.get('/book/list', (req, res) => {
	connection.query('SELECT * FROM books', function(err, r) {
		for(let v of r) {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
		}
		const pug = {
			css: 'book-list',
			js: 'book-list',
			title: '도서 리스트',
			titleSub: '고전도서 리스트',
			lists: r
		}
		// res.json(r);
		res.render('book/list', pug);
		console.log(r);
	});
});
*/
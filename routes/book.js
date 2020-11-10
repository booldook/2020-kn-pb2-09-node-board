const express = require('express');
const router = express.Router();
const moment = require('moment');
const { pool } = require('../modules/mysql-conn');

router.get(['/', '/list'], async (req, res) => {
	var sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 0, 5';

	const connect = await pool.getConnection();
	const r = await connect.query(sql);
	connect.release();

	for(let v of r[0]) v.wdate = moment(v.wdate).format('YYYY-MM-DD');
	const pug = {
		file: 'book-list',
		title: '도서 리스트',
		titleSub: '고전도서 리스트',
		lists: r[0]
	}

	res.render('book/list', pug);
});

router.get('/write', (req, res) => {
	const pug = {
		file: 'book-write',
		title: '도서 작성',
		titleSub: '등록할 도서를 작성하세요.',
	}
	res.render('book/write', pug);
});

router.post('/save', async (req, res) => {
	const { title, writer, wdate, content } = req.body;
	const values = [title, writer, wdate, content];
	const sql = 'INSERT INTO books SET title=?, writer=?, wdate=?, content=?';

	const connect = await pool.getConnection();
	const r = await connect.query(sql, values);
	connect.release();

	res.redirect('/book/list');
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
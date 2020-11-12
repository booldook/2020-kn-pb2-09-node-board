const express = require('express');
const router = express.Router();
const moment = require('moment');
const path = require('path');
const error = require('http-errors');
const { pool } = require('../modules/mysql-conn');
const { alert } = require('../modules/util');
const { upload, allowExt } = require('../modules/multer-conn');

router.get(['/', '/list'], async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 0, 5';
		connect = await pool.getConnection();
		rs = await connect.query(sql);
		connect.release();
		for(let v of rs[0]) {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
			if(v.savefile) v.icon = path.extname(v.savefile).replace('.', '').toUpperCase();
		}
		pug = {
			file: 'book-list',
			title: '도서 리스트',
			titleSub: '고전도서 리스트',
			lists: rs[0]
		}
		res.render('book/list', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage));
	}
});

router.get('/write', (req, res, next) => {
	const pug = {
		file: 'book-write',
		title: '도서 작성',
		titleSub: '등록할 도서를 작성하세요.',
		allowExt
	}
	res.render('book/write', pug);
});

router.get('/write/:id', async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		sql = 'SELECT * FROM books WHERE id=?';
		values = [req.params.id];
		connect = await pool.getConnection();
		rs = await connect.query(sql, values);
		connect.release();
		rs[0][0].wdate = moment(rs[0][0].wdate).format('YYYY-MM-DD');
		pug = {
			file: 'book-update',
			title: '도서 수정',
			titleSub: '수정할 도서 내용을 작성하세요.',
			book: rs[0][0]
		}
		res.render('book/write', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage));
	}
});

router.post('/save', upload.single('upfile'), async (req, res, next) => {
	let connect, rs, sql, values, pug;
	let { title, writer, wdate, content } = req.body;
	try {
		if(req.ext && !req.allow) {
			// 파일을 올렸으나 거부당했을때..
			res.send(alert(`${req.ext} 는 업로드 할 수 없습니다.`, '/book'));
		}
		else {
			// 파일을 올리지 않았거나, 올렸거나
			sql = 'INSERT INTO books SET title=?, writer=?, wdate=?, content=?';
			values = [title, writer, wdate, content];
			if(req.file) {
				sql += ', realfile=?, savefile=?, filesize=?';
				values.push(req.file.originalname);
				values.push(req.file.filename);
				values.push(req.file.size);
			}
			connect = await pool.getConnection();
			rs = await connect.query(sql, values);
			connect.release();
		
			res.redirect('/book/list');
		}
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage));
	}
});

// DELETE FROM books WHERE id=1 OR id=2 OR id=3;
router.get('/delete/:id', async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		sql = `DELETE FROM books WHERE id=${req.params.id}`;
		connect = await pool.getConnection();
		rs = await connect.query(sql);
		res.send(alert(rs[0].affectedRows>0 ? '삭제되었습니다.' : '삭제에 실패하였습니다.', '/book'));
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage));
	}
});

router.post('/change', async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		var { title, writer, wdate, content, id } = req.body;
		sql = 'UPDATE books SET title=?, writer=?, wdate=?, content=? WHERE id=?';
		values = [title, writer, wdate, content, id];
		connect = await pool.getConnection();
		rs = await connect.query(sql, values);
		connect.release();
		res.send(alert(rs[0].affectedRows>0 ? '수정되었습니다.' : '수정에 실패하였습니다.', '/book'));
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage));
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
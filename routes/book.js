const express = require('express');
const router = express.Router();
const moment = require('moment');
const path = require('path');
const fs = require('fs-extra');
const error = require('http-errors');
const { pool, sqlGen } = require('../modules/mysql-conn');
const { alert, getPath, getExt } = require('../modules/util');
const { upload, allowExt, imgExt } = require('../modules/multer-conn');

router.get(['/', '/list'], async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 0, 5';
		connect = await pool.getConnection();
		rs = await connect.query(sql);
		connect.release();
		for(let v of rs[0]) {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
			if(v.savefile) v.icon = getExt(v.savefile, 'upper');
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
		next(error(500, e.sqlMessage || e));
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
			book: rs[0][0],
			allowExt
		}
		res.render('book/write', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage || e));
	}
});

router.post('/save', upload.single('upfile'), async (req, res, next) => {
	let connect, rs, pug, sql, values;
	try {
		if(req.allow == false) {
			// 파일을 올렸으나 거부당했을때..
			res.send(alert(`${req.ext} 는 업로드 할 수 없습니다.`, '/book'));
		}
		else {
			// 파일을 올리지 않았거나, 올렸거나
			connect = await pool.getConnection();
			let obj = sqlGen('I', 'books', ['title', 'writer', 'content', 'wdate'], req.body, req.file);
			rs = await connect.query(obj.sql, obj.values);
			connect.release();
			res.redirect('/book/list');
		}
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage || e));
	}
});

// DELETE FROM books WHERE id=1 OR id=2 OR id=3;
router.get('/delete/:id', async (req, res, next) => {
	let connect, rs, sql, values, pug;
	try {
		connect = await pool.getConnection();
		sql = 'SELECT savefile FROM books WHERE id='+req.params.id;
		rs = await connect.query(sql);
		if(rs[0][0].savefile) await fs.remove(getPath(rs[0][0].savefile));
		sql = `DELETE FROM books WHERE id=${req.params.id}`;
		rs = await connect.query(sql);
		connect.release();
		res.send(alert(rs[0].affectedRows>0 ? '삭제되었습니다.' : '삭제에 실패하였습니다.', '/book'));
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage || e));
	}
});

router.post('/change', upload.single('upfile'), async (req, res, next) => {
	let connect, rs, pug, sql, values;
	try {
		if(req.allow == false) {
			res.send(alert(`${req.ext} 는 업로드 할 수 없습니다.`, '/book'));
		}
		else {
			connect = await pool.getConnection();
			if(req.file) {
				sql = 'SELECT savefile FROM books WHERE id='+req.body.id;
				rs = await connect.query(sql);
				if(rs[0][0].savefile) await fs.remove(getPath(rs[0][0].savefile));
			}
			let obj = sqlGen('U', 'books', ["title", "wdate", "writer", "content"], req.body, req.file);
			obj.sql += ' WHERE id='+req.body.id;
			rs = await connect.query(obj.sql, obj.values);
			connect.release();
			res.send(alert(rs[0].affectedRows>0 ? '수정되었습니다.' : '수정에 실패하였습니다.', '/book'));
		}
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage || e));
	}
});

router.get('/view/:id', async (req, res, next) => {
	let connect, rs, sql, values, pug, book;
	try {
		sql = 'SELECT * FROM books WHERE id=' + req.params.id;
		connect = await pool.getConnection();
		rs = await connect.query(sql);
		connect.release();
		book = rs[0][0];
		book.wdate = moment(book.wdate).format('YYYY-MM-DD');
		if(book.savefile) {
			book.file = getPath(book.savefile, 'rel');
			if(imgExt.includes(getExt(book.savefile))) {
				//	/upload/201112/파일명
				book.src = book.file;
			}
		}
		pug = {
			file: 'book-view',
			title: '도서 상세 보기',
			titleSub: '도서의 내용을 보여줍니다.',
			book
		}
		res.render('book/view', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(error(500, e.sqlMessage || e));
	}
});

router.get('/download', (req, res, next) => {
	let src = getPath(req.query.file);
	res.download(src, req.query.name); 
});

router.get('/remove/:id', async (req, res, next) => {
	let connect, sql, values, rs, pug;
	try {
		sql = 'SELECT savefile FROM books WHERE id='+req.params.id;
		connect = await pool.getConnection();
		rs = await connect.query(sql);
		await fs.remove(getPath(rs[0][0].savefile));
		sql = 'UPDATE books SET savefile=NULL, realfile=NULL, filesize=NULL WHERE id='+req.params.id;
		rs = await connect.query(sql);
		connect.release();
		res.json({ code: 200 });
	}
	catch(e) {
		if(connect) connect.release();
		res.json({ code: 500, error: e });
	}
});

module.exports = router;


// 첨부파일 경로
// /upload/${book.savefile.substr(0, 6)}/${book.savefile}
// path.join(__dirname, '../storage', filename.substr(0, 6), filename)













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
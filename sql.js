const express = require('express');
const app = express();
const { pool, sqlGen } = require('./modules/mysql-conn');

app.listen(3000, () => {
	console.log('http://127.0.0.1:3000');
});

app.get('/select', async (req, res, next) => {
	// var sql = 'SELECT * FROM books ORDER BY id DESC';
	// var { sql, values } = sqlGen('books', 'S', {order: 'ORDER BY id DESC'});
	// var sql = 'SELECT * FROM books WHERE id=197';
	// var { sql, values } = sqlGen('books', 'S', {id: 197});
	// var sql = 'SELECT savefile FROM books WHERE id=197';
	// var { sql, values } = sqlGen('books', 'S', {id: 197, field: ['savefile']});
	// var sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 0, 5';
	var { sql, values } = sqlGen('books', 'S', {order: 'ORDER BY id DESC', limit: [0, 5]});
	var connect = await pool.getConnection();
	var rs = await connect.query(sql);
	res.json(rs[0]);
});

app.get('/insert', async (req, res, next) => {
	req.body = {title: '제목', writer: '글쓴이', wdate: '2020-11-16', content: '내용입니다.'};
	req.file = {filename: '201116-abcd.jpg', originalename: 'abcd.jpg', size: 1234};
	// var sql = 'INSERT INTO books SET title=?, writer=?, wdate=?, content=?';
	// var values = ['제목', '글쓴이', '2020-11-16', '내용입니다.'];
	var { sql, values } = sqlGen('books', 'I', {
		field: ['title', 'writer', 'wdate', 'content'],
		data: req.body,
		file: req.file
	});
	var connect = await pool.getConnection();
	var rs = await connect.query(sql, values);
	connect.release();
	res.json(rs[0]);
});

app.get('/delete/:id', async (req, res, next) => {
	// var sql = `DELETE FROM books WHERE id=${req.params.id}`;
	var {sql, values} = sqlGen('books', 'D', {id: 11});
	var connect = await pool.getConnection();
	var rs = await connect.query(sql);
	connect.release();
	res.json(rs[0]);
});

app.get('/update', async (req, res, next) => {
	req.body = {title: '제목2', writer: '쓴이2', wdate: '2020-11-16', content: '내용.2', id: 201};
	req.file = {filename: '201116-abcd2.jpg', originalname: 'abcd2.jpg', size: 12345};
	// var sql = `UPDATE books SET title=?, writer=?, wdate=?, content=? WHERE id=${req.body.id}`;
	// var values = ['제목2', '쓴이2', '2020-11-16', '내용.2'];
	var { sql, values } = sqlGen('books', 'U', {
		field: ['title', 'writer', 'wdate', 'content'],
		data: req.body,
		file: req.file,
		id: req.body.id
	});
	var connect = await pool.getConnection();
	var rs = await connect.query(sql, values);
	connect.release();
	res.json(rs[0]);
});
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'booldook',
	password: '000000',
	database: 'booldook',
	waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const sqlGen = (table, mode, obj) => {
	let { field=[], data={}, file=null, id=null, order=null, limit=[] } = obj;
	let sql=null, values=[];
	let temp = Object.entries(data).filter(v => field.includes(v[0]));
	
	if(mode == 'I') sql = `INSERT INTO ${table} SET `;
	if(mode == 'U') sql = `UPDATE ${table} SET `;
	if(mode == 'D') sql = `DELETE FROM ${table} WHERE id=${id} `;
	if(mode == 'S') {
		// SELECT * FROM books
		// SELECT title, writer FROM books
		// SELECT * FROM books WHERE id=3
		// SELECT * FROM books WHERE id=3 ORDER BY id DESC
		// SELECT * FROM books WHERE id=3 ORDER BY id DESC LIMIT 0, 3
		sql = `SELECT ${field.length == 0 ? '*' : field.toString()} FROM ${table} `;
		if(id) sql += ` WHERE id=${id} `;
		if(order) sql += ` ${order} `;
		if(limit.length == 2) sql += ` LIMIT ${limit[0]}, ${limit[1]} `;
	}

	if(file) {
		temp.push(['savefile', file.filename]); 
		temp.push(['realfile', file.originalname]); 
		temp.push(['filesize', file.size]); 
	}
	for(var v of temp) {
		sql += v[0] + '=?,';
		values.push(v[1]);
	}
	sql = sql.substr(0, sql.length - 1);
	if(mode == 'U' && id) sql += ` WHERE id=${id} `;
	return { sql, values }
}

module.exports = { pool, mysql, sqlGen };
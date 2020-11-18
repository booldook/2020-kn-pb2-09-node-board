const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// SELECT * FROM books
// SELECT title, writer FROM books
// SELECT * FROM books WHERE id=3
// SELECT * FROM books WHERE id=3 ORDER BY id DESC
// SELECT * FROM books WHERE id=3 ORDER BY id DESC LIMIT 0, 3
// SELECT * FROM users WHERE userid='booldook';
// SELECT * FROM users WHERE userid LIKE '%bool%';
// SELECT * FROM users WHERE userid='booldook' AND id=3; <- 미구현
// SELECT * FROM users WHERE userid='booldook' OR id=3; <- 미구현

// where: ['userid', 'booldook'];
// let field= ['title', 'writer'];
// Object.entries({title: "제", writer: "자", wdate: "11-16"}).filter(v => field.includes(v[0]));

const sqlGen = async (table, mode, obj) => {
	let { field=[], data={}, file=null, where=[], order=[], limit=[]  } = obj;
	let sql=null, values=[];
	let temp = Object.entries(data).filter(v => field.includes(v[0]));
	
	if(mode == 'I') sql = `INSERT INTO ${table} SET `;
	if(mode == 'U') sql = `UPDATE ${table} SET `;
	if(mode == 'D') sql = `DELETE FROM ${table} `;
	if(mode == 'S') sql = `SELECT ${field.length == 0 ? '*' : field.toString()} FROM ${table} `;

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
	if(where.length > 1) sql += ` WHERE ${where[0]} = '${where[1]}' `;
	if(order.length > 1) sql += ` ORDER BY ${order[0]} ${order[1]} `;
	if(limit.length > 1) sql += ` LIMIT ${limit[0]}, ${limit[1]} `;

	if((mode == 'D' || mode == 'U') && sql.indexOf('WHERE') == -1) {
		throw new Error('수정, 삭제는 where절이 필요합니다.');
	}
	let connect = await pool.getConnection();
	let rs = await connect.query(sql, values); 
	connect.release();
	
	return rs;
}

module.exports = { pool, mysql, sqlGen };
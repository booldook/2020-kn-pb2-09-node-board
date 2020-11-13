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

const sqlGen = (mode, table, field, data, file) => {
	let values = [], sql;
	let temp = Object.entries(data).filter(v => field.includes(v[0]));
	
	if(mode == 'I') sql = 'INSERT INTO ' +table+ ' SET ';
	else sql = 'UPDATE ' +table+ ' SET ';
	
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
	return { sql, values }
}

module.exports = { pool, mysql, sqlGen };
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

module.exports = () => {
	return session({
		secret: process.env.SESSION_SALT,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASS
		})
	});
};

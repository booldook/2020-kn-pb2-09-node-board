module.exports = (Store) => {
	return {
		secret: process.env.SESSION_SALT,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
		store: new Store({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASS
		})
	}
};

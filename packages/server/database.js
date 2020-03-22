const env = process.env.NODE_ENV || 'development';
const db = {};
db[env] = {
	driver: 'pg',
	user: process.env.DB_USER,
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DATABASE
};
if (process.env.DB_PASSWORD) {
	db[env].password = process.env.DB_PASSWORD;
}

module.exports = db;

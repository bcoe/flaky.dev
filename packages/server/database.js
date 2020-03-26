const env = process.env.NODE_ENV || 'development';
const db = {};
db[env] = {
	driver: 'pg',
	user: process.env.POSTGRES_USER || 'postgres',
	port: process.env.POSTGRES_PORT ? Number(process.env.DB_PORT) : 5432,
	host: process.env.POSTGRES_HOST || 'localhost',
	database: process.env.POSTGRES_DB
};
if (process.env.POSTGRES_PASSWORD) {
	db[env].password = process.env.POSTGRES_PASSWORD;
}

module.exports = db;

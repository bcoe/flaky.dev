process.env.DATABASE = 'flaky_dev_test';

const {Client} = require('pg');
const client = new Client({
	user: process.env.POSTGRES_USER || process.env.POSTGRES_USER,
	port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
	host: process.env.POSTGRES_HOST || 'localhost',
	database: process.env.POSTGRES_DB
});

const {execSync} = require('child_process');

const output = execSync('npm run migrate:up');
console.info(output.toString('utf8'));

let connected = false;
module.exports = {
	before: async () => {
		if (!connected) {
			await client.connect();
			connected = true;
		}

		await client.query('BEGIN');
	},
	after: async () => {
		await client.query('ROLLBACK');
	},
	end: async () => {
		await client.end();
	},
	client
};

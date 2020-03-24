process.env.DATABASE = 'flaky_dev_test'

const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER || process.env.USER,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DATABASE
});

const {execSync} = require('child_process');

const output = execSync('npm run migrate:up');
console.info(output.toString('utf8'))

module.exports = {
  before: async () => {
    await client.connect();
    await client.query('BEGIN');
  },
  after: async () => {
    await client.query('ROLLBACK');
  },
  end: async () => {
    await client.end();
  },
  client
}

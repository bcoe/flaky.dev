const {beforeEach, afterEach, describe, it} = require('mocha');
const {client, before, after} = require('./utils/db-helper');
const {expect} = require('chai');
const nock = require('nock');

process.env.LOG_LEVEL = 'Infinity';
const upsertGitHubUser = require('../lib/upsert-github-user');

nock.disableNetConnect();

describe('upsertGitHubUser', () => {
	beforeEach(async () => {
		await before();
	});
	afterEach(async () => {
		await after();
	});

	it('populates a new user record first time a login is observed', async () => {
		nock('https://api.github.com')
			.get('/user')
			.reply(200, {
				login: 'bcoe',
				name: 'Ben Coe',
				email: 'bencoe@example.com',
				avatar_url: 'http://www.github.com/bencoe.png'
			});
		await upsertGitHubUser('abc123', client);
		const users = await client.query({
			text: 'SELECT login, access_token, email FROM users_github WHERE login = $1',
			values: ['bcoe']
		});
		expect(users.rowCount).to.equal(1);
		const [user] = users.rows;
		expect(user).to.eql({
			login: 'bcoe',
			access_token: 'abc123',
			email: 'bencoe@example.com'
		});
	});

	it('handles account with no email address', async () => {
		nock('https://api.github.com')
			.get('/user')
			.reply(200, {
				login: 'bcoe',
				name: 'Ben Coe',
				avatar_url: 'http://www.github.com/bencoe.png'
			});
		await upsertGitHubUser('qwerty', client);
		const users = await client.query({
			text: 'SELECT login, access_token, email FROM users_github WHERE login = $1',
			values: ['bcoe']
		});
		expect(users.rowCount).to.equal(1);
		const [user] = users.rows;
		expect(user).to.eql({
			login: 'bcoe',
			access_token: 'qwerty',
			email: null
		});
	});

	it('updates an existing user’s access token', async () => {
		nock('https://api.github.com')
			.get('/user')
			.twice()
			.reply(200, {
				login: 'bcoe',
				name: 'Ben Coe',
				email: 'bencoe@example.com',
				avatar_url: 'http://www.github.com/bencoe.png'
			});
		await upsertGitHubUser('abc123', client);
		await upsertGitHubUser('qwerty', client);
		const users = await client.query({
			text: 'SELECT login, access_token FROM users_github WHERE login = $1',
			values: ['bcoe']
		});
		expect(users.rowCount).to.equal(1);
		const [user] = users.rows;
		expect(user).to.eql({
			login: 'bcoe',
			access_token: 'qwerty'
		});
	});
});

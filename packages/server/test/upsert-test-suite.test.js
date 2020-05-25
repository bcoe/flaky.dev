
const {beforeEach, afterEach, describe, it} = require('mocha');
const {client, before, after} = require('./utils/db-helper');
// Const {expect} = require('chai');
const nock = require('nock');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const {readFileSync} = require('fs');

process.env.LOG_LEVEL = 'Infinity';
const upsertTestSuite = require('../lib/upsert-test-suite');

nock.disableNetConnect();

describe('upsertTestSuite', () => {
	beforeEach(async () => {
		await before();
		await client.query({
			text: 'INSERT INTO users_github(login) VALUES ($1)',
			values: ['bcoe']
		});
		await client.query({
			text: 'INSERT INTO repos_github(full_name) VALUES ($1)',
			values: ['bcoe/yargs']
		});
	});
	afterEach(async () => {
		await after();
	});

	it('populates all test cases and suite, the first time they are observed', async () => {
		const xml = readFileSync(require.resolve('./fixtures/yargs-tests-all-green.xml'), 'utf8');
		await upsertTestSuite('bcoe/yargs', await parser.parseStringPromise(xml), client);
	});

	// TODO: add test case for the multiple suite format (like tap-xunit).
	// TODO: figure out data structure for tracking flakiness (perhaps we
	// could use an array of failures and successes)?

	// TODO: think about how we track an issue that we've opened on GitHub
	// this ID needs to be stored somewhere.
});

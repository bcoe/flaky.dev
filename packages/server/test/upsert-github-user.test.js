const {before, client, after, end} = require('./utils/db-helper');
const nock = require('nock');

const upsertGitHubUser = require('../lib/upsert-github-user');

nock.disableNetConnect();

describe('upsertGitHubUser', () => {
  beforeEach(async () => {
    await before();
  });
  afterEach(async () => {
    await after();
  });
  it("populates a new user record first time a login is observed", async () => {
    nock('https://api.github.com')
      .get('/user')
      .reply(200, {
        login: 'bcoe',
        name: 'Ben Coe',
        email: 'bencoe@example.com',
        avatar_url: 'http://www.github.com/bencoe.png'
      });
    await upsertGitHubUser('abc123', client);
  })
});
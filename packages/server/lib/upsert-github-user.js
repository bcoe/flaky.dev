const {Octokit} = require('@octokit/rest');
const pino = require('pino');
const logger = pino({
	level: process.env.LOG_LEVEL ? Number(process.env.LOG_LEVEL) : 'info'
});

module.exports = async (accessToken, client) => {
	const octokit = new Octokit({
		auth: accessToken
	});
	const user = (await octokit.users.getAuthenticated()).data;
	const existingUser = await client.query({
		text: 'SELECT login FROM users_github WHERE login = $1',
		values: [user.login]
	});
	if (existingUser.rowCount === 0) {
		logger.info(`user ${user.login} is new, creating entry`);
		await client.query({
			text: 'INSERT INTO users_github(login, email, name, avatar_url, access_token) VALUES ($1, $2, $3, $4, $5)',
			values: [user.login, user.email, user.name, user.avatar_url, accessToken]
		});
	} else {
		logger.info(`user ${user.login} already exists, updating token`);
		await client.query({
			text: 'UPDATE users_github SET access_token = $1 WHERE login = $2',
			values: [accessToken, user.login]
		});
	}

	return {
		login: user.login,
		name: user.name,
		email: user.email,
		avatar_url: user.avatar_url
	};
};

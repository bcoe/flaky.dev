const {Octokit} = require('@octokit/rest');

module.exports = async (accessToken, pool) => {
	const octokit = new Octokit({
		auth: accessToken
	});
	const user = (await octokit.users.getAuthenticated()).data;
	const client = await pool.connect();
	const userQuery = {
		name: 'fetch-existing-user',
		text: 'SELECT * FROM users_github WHERE login = $1',
		values: [user.login]
	};
	let existingUser = await client.query(userQuery);
	if (existingUser.rowCount === 0) {
		console.info(`user ${user.login} is new, creating entry`);
		await client.query({
			name: 'create-user',
			text: 'INSERT INTO users_github(login, email, name, avatar_url, access_token) VALUES ($1, $2, $3, $4, $5)',
			values: [user.login, user.email, user.name, user.avatar_url, accessToken]
		});
	} else {
		console.info(`user ${user.login} already exists, updating token`);
		await client.query({
			name: 'update-user',
			text: 'UPDATE users_github SET access_token = $1 WHERE login = $2',
			values: [accessToken, user.login]
		});
		existingUser = await client.query(userQuery);
	}

	return {
		login: user.login,
		name: user.name,
		email: user.email,
		avatar_url: user.avatar_url
	};
};

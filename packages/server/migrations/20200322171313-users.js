'use strict';

exports.up = async function (db) {
	await db.createTable('users_github', {
		login: {type: 'text', primaryKey: true},
		email: {type: 'text'},
		name: {type: 'text'},
		avatar_url: {type: 'text'},
		access_token: {type: 'text'}
	});
	await db.addIndex('users_github', 'access_token_idx', ['access_token'], true);
};

exports.down = async function (db) {
	await db.dropTable('users_github');
};

exports._meta = {
	version: 1
};

'use strict';

exports.up = async function (db) {
	await db.createTable('users_github', {
		login: {type: 'varchar(128)', primaryKey: true},
		email: {type: 'varchar(320)'},
		name: {type: 'varchar(256)'},
		avatar_url: {type: 'varchar(512)'},
		access_token: {type: 'varchar(256)'}
	});
};

exports.down = async function (db) {
	await db.dropTable('users_github');
};

exports._meta = {
	version: 1
};

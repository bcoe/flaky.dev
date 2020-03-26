'use strict';

exports.up = async function (db) {
	await db.createTable('orgs_github', {
		name: {type: 'varchar(128)', primaryKey: true},
		company: {type: 'varchar(256)'},
		avatar_url: {type: 'varchar(512)'}
	});
};

exports.down = async function (db) {
	await db.dropTable('orgs_github');
};

exports._meta = {
	version: 1
};

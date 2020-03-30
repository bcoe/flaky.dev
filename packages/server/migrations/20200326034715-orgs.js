'use strict';

exports.up = async function (db) {
	await db.createTable('orgs_github', {
		name: {type: 'text', primaryKey: true},
		company: {type: 'text'},
		avatar_url: {type: 'text'}
	});
};

exports.down = async function (db) {
	await db.dropTable('orgs_github');
};

exports._meta = {
	version: 1
};

'use strict';

exports.up = async function (db) {
	await db.createTable('repos_github', {
		full_name: {type: 'text', primaryKey: true},
		user: {type: 'text'},
		org: {type: 'text'}
	});
	await db.addForeignKey('repos_github', 'users_github', 'repos_users_github_user_fk', {
		user: 'login'
	}, {onDelete: 'CASCADE'});
	await db.addForeignKey('repos_github', 'orgs_github', 'repos_orgs_github_org_fk', {
		org: 'name'
	}, {onDelete: 'CASCADE'});
};

exports.down = async function (db) {
	await db.dropTable('repos_github');
};

exports._meta = {
	version: 1
};

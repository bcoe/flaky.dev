'use strict';

exports.up = async function (db) {
	await db.createTable('repos_github', {
		full_name: {type: 'varchar(140)', primaryKey: true},
		owner: {type: 'varchar(128)', notNull: true}
	});
	await db.addForeignKey('repos_github', 'users_github', 'repos_users_github_login_fk', {
		owner: 'login'
	}, {onDelete: 'CASCADE'});
	await db.addForeignKey('repos_github', 'orgs_github', 'repos_orgs_github_name_fk', {
		owner: 'name'
	}, {onDelete: 'CASCADE'});
};

exports.down = async function (db) {
	await db.dropTable('repos_github');
};

exports._meta = {
	version: 1
};

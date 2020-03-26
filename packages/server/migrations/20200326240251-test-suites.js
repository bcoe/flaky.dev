'use strict';

exports.up = async function (db) {
	await db.createTable('test_suites', {
		id: {type: 'int', primaryKey: true, autoIncrement: true},
		repo_full_name: {type: 'varchar(140)', notNull: true},
		success: {type: 'int', defaultValue: 0},
		failure: {type: 'int', defaultValue: 0},
		description: {type: 'varchar(512)'}
	});
	await db.addForeignKey('test_cases', 'repos_github', 'test_suites_repos_github_fk', {
		repo_full_name: 'full_name'
	}, {onDelete: 'CASCADE'});
};

exports.down = async function (db) {
	await db.dropTable('test_suites');
};

exports._meta = {
	version: 1
};

'use strict';

exports.up = async function (db) {
	await db.runSql('CREATE TYPE type AS ENUM (\'success\', \'failure\');');
	await db.runSql(`CREATE type run AS (
		type  type,
		time  timestamp,
		run_time  decimal
	)`);
	await db.createTable('test_cases', {
		id: {type: 'int', primaryKey: true, autoIncrement: true},
		repo_full_name: {type: 'text', notNull: true},
		suite: {type: 'text'},
		classname: {type: 'text'},
		name: {type: 'text', notNull: true},
		success: {type: 'int', defaultValue: 0},
		failure: {type: 'int', defaultValue: 0},
		failure_message: {type: 'text'},
		last_run_time: {type: 'decimal'},
		flaky: {type: 'boolean', defaultValue: false},
		failing: {type: 'boolean', defaultValue: false},
		runs: {type: 'run[]'}
	});
	await db.addForeignKey('test_cases', 'repos_github', 'test_cases_repos_github_fk', {
		repo_full_name: 'full_name'
	}, {onDelete: 'CASCADE'});
	await db.addIndex('test_cases', 'repo_full_name_suite_classname_name_idx', ['repo_full_name', 'suite', 'classname', 'name'], true);
};

exports.down = async function (db) {
	await db.dropTable('test_cases');
	await db.runSql('DROP TYPE run CASCADE');
	await db.runSql('DROP TYPE type CASCADE');
};

exports._meta = {
	version: 1
};

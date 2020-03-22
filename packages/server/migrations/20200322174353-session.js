'use strict';

exports.up = async function (db) {
	await db.createTable('session', {
		sid: {type: 'varchar', primaryKey: true},
		sess: {type: 'json', notNull: true},
		expire: {type: 'timestamp(6)', notNull: true}
	});
};

exports.down = async function (db) {
	await db.dropTable('session');
};

exports._meta = {
	version: 1
};

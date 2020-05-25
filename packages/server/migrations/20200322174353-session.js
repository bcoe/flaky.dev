'use strict';

exports.up = async function (db) {
	await db.createTable('session', {
		sid: {type: 'text', primaryKey: true},
		sess: {type: 'json', notNull: true},
		expire: {type: 'timestamp', notNull: true}
	});
};

exports.down = async function (db) {
	await db.dropTable('session');
};

exports._meta = {
	version: 1
};

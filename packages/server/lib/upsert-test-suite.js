const {Octokit} = require('@octokit/rest');
const crypto = require('crypto');
const pino = require('pino');
const logger = pino({
	level: process.env.LOG_LEVEL ? Number(process.env.LOG_LEVEL) : 'info'
});
const {noTestSuiteError, noTestCasesError} = require('./errors');

// there's no collision concerns, so we're opting for a
// fast algorithm when hashing the key:
function md5 (str) {
	return crypto.createHash('md5').update(str).digest("hex");
}

function buildInsertStatement (repoFullName, testSuiteObject) {
	const dedupe = new Map();
	const suiteName = testSuiteObject.testsuite.$.name || '';
	const insertStrings = [];
	const values = [];
	let index = 1;
	for (const testCase of testSuiteObject.testsuite.testcase) {
		const failureMessage = testCase.failure ? testCase.failure[0] : null;
		const className = testCase.$.classname || '';
		const testName = testCase.$.name || '';
		const lastRunTime = testCase.$.time ? Number(testCase.$.time) : 0;
		const success = testCase.failure ? 0 : 1;
		const failure = testCase.failure ? 1 : 0;
		
		// Avoid bulk inserting two identical test entries, this happens if a suite
		// has the same class name, test name, and suite name:
		const key = `${md5(suiteName)}_${md5(className)}_${md5(testName)}`;
		if (dedupe.has(key)) {
			continue;
		}
		dedupe.set(key);
		
		/*
		repo_full_name, suite, classname, name, success, failure,
		last_run_time, failing
		*/
		insertStrings.push(`(\$${index++}, \$${index++}, \$${index++}, \$${index++},
			\$${index++}, \$${index++}, \$${index++}, \$${index++}, \$${index++})`);
		values.push(repoFullName, suiteName, className, testName, success, failure,
			failureMessage, lastRunTime, !!failure);
	}
	
	return {values, insertString: `${insertStrings.join(', ')}`};
}

module.exports = async (repoFullName, testSuiteObject, client) => {
	if (!testSuiteObject.testsuite) {
		throw noTestSuiteError();
	}
	if (!testSuiteObject.testsuite || testSuiteObject.testsuite.length === 0) {
		throw noTestCasesError();
	}
	const {insertString, values} = buildInsertStatement(repoFullName, testSuiteObject);
	await client.query({
		text: `INSERT INTO  test_cases(
			repo_full_name, suite, classname, name, success, failure, failure_message,
			last_run_time, failing
		)  VALUES ${insertString}
		ON CONFLICT (repo_full_name, suite, classname, name)
		DO UPDATE
			SET
				success = test_cases.success + EXCLUDED.success,
				failure = test_cases.failure + EXCLUDED.failure,
				failing = EXCLUDED.failing,
				failure_message = EXCLUDED.failure_message,
				last_run_time = EXCLUDED.last_run_time
			WHERE 
				test_cases.repo_full_name = EXCLUDED.repo_full_name AND
				test_cases.suite = EXCLUDED.suite AND
				test_cases.classname = EXCLUDED.classname AND
				test_cases.name = EXCLUDED.name
		;`,
		values
	});
};
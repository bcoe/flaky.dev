module.exports = {
  noTestSuiteError() {
    const err = new Error('no "testsuite" key found in test output');
    err.code = 422;
    return err;
  },
  noTestCasesError() {
    const err = new Error('no test cases found in test output');
    err.code = 422;
    return err;
  }
}
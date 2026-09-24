const api = require('../src/order.js');
const runTests = require('./cases.js');
const results = runTests(api);
for (const result of results) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.message ? ': ' + result.message : ''}`);
console.log(`${results.filter(result => result.pass).length}/${results.length} tests passed`);
process.exitCode = results.some(result => !result.pass) ? 1 : 0;

const results = window.runSnackTests(window.SnackOrder);
const passed = results.filter(result => result.pass).length;
document.getElementById('summary').textContent = `${passed}/${results.length} tests passed`;
for (const result of results) {
  const li = document.createElement('li');
  li.className = result.pass ? 'pass' : 'fail';
  li.textContent = `${result.pass ? 'PASS' : 'FAIL'}: ${result.name}${result.message ? '. ' + result.message : ''}`;
  document.getElementById('results').append(li);
}

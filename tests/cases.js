/* Both browser and CI run these tests against the real order.js functions. */
(function (root) {
  function runTests(api) {
    const results = [];
    const catalog = {
      cookie: { priceCents: 200, stock: 5 },
      fruit: { priceCents: 300, stock: 2 },
      pretzel: { priceCents: 150, stock: 0 }
    };
    function equal(actual, expected) {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
    function test(name, body) {
      try { body(); results.push({ name, pass: true }); }
      catch (error) { results.push({ name, pass: false, message: error.message }); }
    }
    test('One cookie costs 200 cents', () => {
      equal(api.quoteOrder([{ id: 'cookie', quantity: 1 }], catalog).totalCents, 200);
    });
    test('Two cookies cost 400 cents', () => {
      equal(api.quoteOrder([{ id: 'cookie', quantity: 2 }], catalog).totalCents, 400);
    });
    test('Three fruit cups cannot be fulfilled from stock of two', () => {
      equal(api.quoteOrder([{ id: 'fruit', quantity: 3 }], catalog).ok, false);
    });
    test('Out-of-stock pretzels are rejected', () => {
      equal(api.quoteOrder([{ id: 'pretzel', quantity: 1 }], catalog).ok, false);
    });
    test('Empty orders are rejected', () => { equal(api.quoteOrder([], catalog).ok, false); });
    test('Unknown snacks are rejected', () => {
      equal(api.quoteOrder([{ id: 'pizza', quantity: 1 }], catalog).ok, false);
    });
    test('Fractional quantities are rejected', () => {
      equal(api.quoteOrder([{ id: 'cookie', quantity: 1.5 }], catalog).ok, false);
    });
    test('Negative quantities are rejected', () => {
      equal(api.quoteOrder([{ id: 'cookie', quantity: -1 }], catalog).ok, false);
    });
    test('A mixed cart of two cookies and two fruit cups costs 1000 cents', () => {
      equal(api.quoteOrder([{ id: 'cookie', quantity: 2 }, { id: 'fruit', quantity: 2 }], catalog).totalCents, 1000);
    });
    return results;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = runTests;
  else root.runSnackTests = runTests;
})(typeof globalThis !== 'undefined' ? globalThis : this);

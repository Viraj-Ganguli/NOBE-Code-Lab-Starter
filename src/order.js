/* Business rules shared by the app and tests. Edit this file for your fix. */
(function (root) {
  'use strict';
  function validateOrder(cart, catalog) {
    if (!Array.isArray(cart) || cart.length === 0) return 'Choose at least one snack.';
    const requested = {};
    for (const line of cart) {
      const item = catalog[line.id];
      if (!item) return 'Unknown snack.';
      if (!Number.isInteger(line.quantity) || line.quantity < 1) return 'Use positive whole-number quantities.';
      requested[line.id] = (requested[line.id] || 0) + line.quantity;
    }
    for (const id of Object.keys(requested)) {
      if (requested[id] > catalog[id].stock) return 'Not enough stock.';
    }
    return null;
  }
  function calculateTotalCents(cart, catalog) {
    return cart.reduce((total, line) => total + catalog[line.id].priceCents * line.quantity, 0);
  }
  function quoteOrder(cart, catalog) {
    const error = validateOrder(cart, catalog);
    if (error) return { ok: false, error };
    return { ok: true, totalCents: calculateTotalCents(cart, catalog) };
  }
  const api = { validateOrder, calculateTotalCents, quoteOrder };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnackOrder = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* UI wiring. Business rules belong in order.js. */
const catalog = window.SNACK_CATALOG;
const form = document.getElementById('order-form');
for (const [id, item] of Object.entries(catalog)) {
  const row = document.createElement('label');
  row.textContent = `${item.name} — $${(item.priceCents / 100).toFixed(2)} each (${item.stock} available)`;
  const input = document.createElement('input');
  input.type = 'number'; input.value = '0'; input.min = '0'; input.step = '1';
  input.name = id; input.setAttribute('aria-label', `${item.name} quantity`);
  row.append(input); document.getElementById('items').append(row);
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cart = Object.keys(catalog).map(id => ({ id, quantity: Number(form.elements[id].value) }))
    .filter(line => line.quantity !== 0);
  const quote = window.SnackOrder.quoteOrder(cart, catalog);
  const output = document.getElementById('result');
  output.textContent = quote.ok ? `Order can be fulfilled. Total: $${(quote.totalCents / 100).toFixed(2)}` : quote.error;
  output.className = quote.ok ? 'success' : 'error';
});

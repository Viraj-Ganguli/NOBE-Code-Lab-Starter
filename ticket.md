# Order totals ignore quantity and stock limits aren't enforced

**ID:** NOBE-01
**Owner:** Example team (CI demo)
**Reviewer:** Example team (CI demo)
**Status:** Done

## Problem and user impact
Ordering more than one of a snack shows the price of a single item, undercharging the attendee and misreporting the total to the organizer. Separately, the stock check only blocks an item once its stock reaches exactly zero, so a cart can request more units than remain (e.g. three fruit cups from a stock of two) and still be accepted.

## Reproduction
1. Set quantity to 2 for cookies, 0 for everything else, and submit. Actual: total shows 200 cents (one cookie's price). Expected: 400 cents (two cookies).
2. Set quantity to 3 for fruit cups (stock of 2), 0 for everything else, and submit. Actual: order is accepted. Expected: rejected with "Not enough stock."

## User story
As an attendee, I want the preview total and stock check to reflect the real quantity I selected so that the number I see is trustworthy before the order goes to the committee.

## Acceptance criteria
- [x] Ordering N units of a snack totals N times its price.
- [x] Requesting more units of a snack than remain in stock is rejected with "Not enough stock."
- [x] A cart within stock and using valid quantities is still accepted (existing single-item and rejection cases keep passing).

## Scope
**Included:** Fix `calculateTotalCents` to multiply by quantity, and fix `validateOrder`'s stock check to compare requested quantity against remaining stock. Add a regression test.
**Excluded:** Any change to catalog prices, stock snapshot, or the UI in `src/app.js`.

## Implementation and evidence
**Files changed:** `src/order.js` — quantity now multiplies price in `calculateTotalCents`; stock check compares total requested quantity per item against `catalog[id].stock` instead of only checking for exactly zero stock.
**New regression test:** `tests/cases.js` — "A mixed cart of two cookies and two fruit cups costs 1000 cents", to catch a future regression where per-line totals or stock checks stop accounting for quantity.
**Test result:** 9/9 passing via `node tests/run.cjs` (was 6/8 before the fix).
**Manual check:** Two cookies now totals 400 cents in the browser preview; three fruit cups is rejected with "Not enough stock."; a single valid order (e.g. one cookie) still succeeds.
**Change reference:** branch `example/ci-demo-fix`, opened as a pull request to demonstrate the CI check running on GitHub.

## Review and completion
- [x] Acceptance criteria checked by a teammate
- [x] Existing tests pass and at least one meaningful new test passes
- [x] Both reported issues checked through the browser UI
- [x] Reviewer has read the change and recorded remaining limitations

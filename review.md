# Change review

**Ticket:** NOBE-01
**Author:** Example team (CI demo)
**Reviewer:** Example team (CI demo)

## What changed and why
Before: `calculateTotalCents` summed each cart line's unit price without multiplying by quantity, and `validateOrder` only flagged a snack as out of stock once its stock hit exactly zero. After: totals multiply price by quantity per line, and the stock check compares the total requested quantity for each snack against its remaining stock.

## Evidence
`node tests/run.cjs` now reports 9/9 passing, up from the starter's 6/8. The new test, "A mixed cart of two cookies and two fruit cups costs 1000 cents," fails against the pre-fix code (it would compute 500 cents instead of 1000) and passes after the fix.

## Reviewer feedback
Question raised: does the stock fix also cover ordering the same snack across two separate cart lines (rather than one line with a larger quantity)? Answer: yes — `requested[id]` is accumulated by snack id before the stock comparison, so two lines of the same snack are summed before checking against stock.

## Remaining limitations
These tests only exercise `quoteOrder`/`validateOrder`/`calculateTotalCents` directly; they don't click through the actual HTML form, so a UI wiring bug in `src/app.js` wouldn't be caught here (the manual browser check above covers that gap for this change). The app also has no real payment, stock reservation, or persistence, so none of that is validated.

## Decision
Ready for handoff. Opened as a pull request against `main` to demonstrate the CI check (`.github/workflows/tests.yml`) running automatically on GitHub; not merged, since `main` is meant to keep the starter's original two bugs for future workshop participants.

# SnackBot: a NOBE client-project lab

[![CI](https://github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter/actions/workflows/tests.yml/badge.svg)](https://github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter/actions/workflows/tests.yml)

You inherited a small JavaScript prototype. Your team must investigate a client complaint, write a ticket, change production code, add a test, and review the result.

## Start here

This lab lives at [github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter](https://github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter). Get your own copy one of two ways:

- **GitHub (recommended if your team will open a pull request):** click **Fork** on the repo page to copy it into your own GitHub account, then clone your fork. See [Git and GitHub](#git-and-github) below for the exact commands.
- **ZIP:** download the repo as a ZIP (**Code → Download ZIP**) and extract the entire archive. Do not open files from inside the ZIP preview.

1. Get the folder using one of the two methods above.
2. Open this folder in a code editor. Any plain-text code editor works.
3. Open `index.html` in a browser. No server, accounts, package install, or internet is required.
4. Open `tests/index.html` in another browser tab. The starter intentionally passes **6 of 8 tests**.
5. Keep the editor and browser side by side. Save a changed file, then reload the app or test tab.

Optional terminal route, if Node.js is already installed: `node tests/run.cjs` from this folder. A failing test returns a nonzero exit code, which also makes CI fail.

## The client message

> “At our last meeting, ordering two cookies showed the price of only one. Someone could also request three fruit cups even though we only had two. Please make the preview trustworthy before we share it with the committee. Keep the current snack choices and layout.”

This is a fictional client brief modeled on small maintenance work. The app checks an inventory snapshot; it does not charge money, reserve stock, or store orders.

## Your team

Work in groups of three. Use one shared working copy on one laptop so you do not overwrite separate versions.

- **PM:** reproduce the complaint, draft the ticket, and ask the team to agree on scope and acceptance criteria.
- **Developer:** trace the behavior into the source and propose the smallest fix. Explain the change before saving it.
- **QA/reviewer:** add a regression test, check the actual vs. expected behavior, and review the diff against the ticket.

Everyone contributes. Rotate who controls the editor when you move from ticket to code to test. In pairs, combine PM and QA. Teammates can use their own computers to read code or calculate expected outcomes, but hand off edits into the same working copy. This folder has no live collaboration service.

## The work

### Investigate before editing

Try two cookies with every other quantity set to zero. Write down the actual and expected total. Then try three fruit cups with the other quantities zero. Compare those results with the client message and failing tests.

### Write your actual ticket

Edit `ticket.md` together. Fill in a specific title, problem, reproduction steps, acceptance criteria, owner and scope. The prompts are a scaffold, not a completed answer. See `docs/ticket-example.md` for a filled example from an unrelated feature.

Write at least three checkable criteria, including valid behavior that must keep working. Have another teammate read them before coding. Move the status to In Progress when the team agrees on the work.

### Change the code

Start in `src/order.js`. Read `quoteOrder`, `validateOrder`, and `calculateTotalCents`. These functions power both the real screen and the tests. The outer wrapper only makes the same functions available in a browser and in Node; leave it alone.

Fix both reported behaviors without changing the catalog prices, removing tests, or hard-coding the sample orders. Keep the current public function names and result format so the UI keeps working. You should not need to rewrite `src/app.js`.

### Add a regression test

In `tests/cases.js`, add at least one new case not already in the suite. Copy the structure of a nearby `test(...)`, then change its description, input and expected result. Calculate the expected result yourself.

Choose a meaningful case, such as a mixed cart, the exact stock boundary, or the same snack on two cart lines. Explain which mistake your test would catch. If it targets a repaired bug, temporarily undo that fix and confirm the test fails, then restore it.

### Review and hand off

Run all tests. Reproduce both client complaints again in the browser. Check that ordinary valid orders still work. Move the ticket to In Review / QA.

The reviewer reads the code change and acceptance criteria, then completes `review.md`. Ask a neighboring team to challenge one assumption. Only mark Done when the criteria, new test, manual checks, and review are complete.

**Deliver:** the changed source, completed `ticket.md`, added test, and `review.md`. Share your team's folder or Git branch with the facilitator. Be ready to demonstrate one failure and the fix.

## Where things live

| File | Purpose |
| --- | --- |
| `index.html`, `style.css` | Order screen and visual styling |
| `src/app.js` | Reads the form and displays the result |
| `src/catalog.js` | Fictional prices and inventory snapshot |
| `src/order.js` | Business rules you will repair |
| `tests/cases.js` | Tests shared by browser and Node |
| `tests/index.html` | Browser test runner |
| `tests/run.cjs` | Terminal and CI test runner |
| `ticket.md`, `review.md` | Your team's actual work records |
| `.github/workflows/tests.yml` | CI checks on pushes and pull requests |

The flow is: form input calls `quoteOrder`; that calls validation and total calculation; the UI displays the result. Tests call the same API without using the form. Price calculations use integer cents to avoid doing money calculations with decimal dollars.

## Git and GitHub

The core lab does not require GitHub — the ZIP route above works fully offline. Use this section if your team wants the real workflow: a branch, a pull request, and a CI check that runs automatically.

### One-time setup (per team)

1. On the [repo page](https://github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter), click **Fork** (top right) to copy the repo into your own GitHub account. Each team should fork separately so teams don't collide on the same branches.
2. Clone your fork (replace `your-username`):

   ```sh
   git clone https://github.com/your-username/NOBE-Code-Lab-Starter.git
   cd NOBE-Code-Lab-Starter
   ```

   Git may prompt for your usual author identity (`git config user.name` / `user.email`) the first time you commit.

### While you work

```sh
git switch -c team/reliable-orders
# ...edit src/order.js, tests/cases.js, ticket.md, review.md...
node tests/run.cjs
git add src/order.js tests/cases.js ticket.md review.md
git commit -m "Fix order totals and stock validation"
git push -u origin team/reliable-orders
```

Run these commands from the project root, after you've made and saved your changes. Commit only the files you were asked to touch.

### Open the pull request and watch CI run

1. Push prints a link ("Create a pull request for 'team/reliable-orders' on GitHub"), or go to your fork on GitHub — it shows a **Compare & pull request** button for the branch you just pushed.
2. Base the PR on your **own fork's `main`** (not the original repo) — the default is usually correct. Paste `review.md`'s contents into the PR description and link your ticket.
3. Open the PR. Within a few seconds a **checks** section appears at the bottom of the PR (and a yellow/green/red dot next to the latest commit) running the `SnackBot tests` workflow — the same `node tests/run.cjs` you ran locally, on a clean GitHub-hosted runner with Node 22. Click **Details** next to the check to see the live log.
4. A red ✗ means at least one test still fails — fix the code or test and push another commit to the same branch; the check re-runs automatically. A green ✓ means all tests pass on a fresh checkout, not just your machine.
5. The workflow (`.github/workflows/tests.yml`) only reports status; it does not deploy anything and does not block merging by itself. A facilitator with admin access could make it a required check under **Settings → Branches** if they want it to block merges.

Merge (or have the facilitator merge) once the check is green and the review is complete, or leave the PR open for the facilitator to review live.

**Reference:** [PR #1](https://github.com/Viraj-Ganguli/NOBE-Code-Lab-Starter/pull/1) shows this whole flow end to end — a worked fix, a filled-in `ticket.md`/`review.md`, and a passing `SnackBot tests` check. It's closed without merging so `main` keeps the starter's original bugs.

## If you get stuck

Read the test's expected and actual output first. Trace the specific input through `src/order.js`. Ask the facilitator for a hint before opening a solution.

If edits do not appear, save the file, reload the browser, and confirm you edited the folder you opened. If the test page is blank, check the browser console for a JavaScript syntax error. Files must stay in their original relative folders. A code editor should save `.js` as plain text, not rich text.

## Optional follow-up after the core work

The client wants the preview to show the total snack count. Write a separate ticket, add `itemCount` to a successful quote, display it in the UI, and add a test. Agree on this new scope before coding; do not mix it into the bug fix without a ticket update.

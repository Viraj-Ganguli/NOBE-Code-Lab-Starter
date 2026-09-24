# Example only: show an empty events message

This is an unrelated completed example to demonstrate the level of detail. Write your own snack-order ticket in `ticket.md`.

**Owner:** Priya
**Reviewer:** Alex
**Status:** Ready

## Problem
When no events exist, the club events screen is blank. Members cannot tell whether it loaded successfully.

## Reproduction
Open the events screen with an empty events list. Actual: an empty content area. Expected: a clear message that there are no upcoming events.

## User story
As a member, I want to know when no events are scheduled so that I do not assume the page is broken.

## Acceptance criteria
- With zero events, the page shows “No upcoming events.”
- With at least one event, the page shows the event list and hides that message.
- If loading fails, the page shows an error rather than claiming there are no events.

## Scope
Include the message and tests for empty, populated and failed states. Exclude event creation and notification emails.

The ticket describes a desired outcome. Implementation details and review evidence are added as the work progresses.

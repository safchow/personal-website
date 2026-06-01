---
name: create-ticket
description: Turn a request, plan, investigation, or bug report into a well-structured ticket and publish it to whatever issue tracker is in use. Use when the user asks to create a ticket, file an issue, write up a migration/refactor plan, capture work as a backlog item, file a bug, log a security finding, or "publish this as a ticket/issue".
---

# Create Ticket

Use this skill to convert an informal request, investigation, or approved plan into
a clear, reviewable ticket. Treat a ticket as a contract: someone who was not in the
conversation should understand the goal, the scope, the plan, and how to know when
the work is done — without needing the original chat thread or your memory.

This skill is tracker-agnostic. The structure and quality bar apply regardless of
which issue tracker is used; adapt field names and the publish step to that tool.

## Operating Principles

- **Plan before publishing.** Draft the ticket in chat and get explicit approval
  before creating it. Never create the ticket until the user confirms.
- **Match reality, not the conversation.** Read the actual code/branch/infra the
  ticket targets. A ticket that contradicts the repo is worse than no ticket. If the
  request contradicts reality (e.g. "migrate to X" when already on X), reframe to the
  real delta and tell the user.
- **The ticket must be self-contained.** A link to a chat thread, doc, or design is
  provenance, not a substitute for content. Links rot and gate on access. Summarize
  the essential context in the body, then link the source.
- **Investigate before filing, not inside the ticket.** Do not file a ticket whose
  scope is "find out if this is real." Confirm the repro or the question's answer
  first; if genuinely a research question, file it as a spike with explicit exit
  criteria, not as a vague task.
- **Scope is a promise.** State what is in scope and, when the boundary is fuzzy,
  what is out of scope. Vague scope produces vague PRs.
- **Acceptance criteria are testable.** Each criterion is a verifiable end state, and
  where possible names the test and the edge cases to cover.
- **Model relationships and ownership as fields, not prose.** Dependencies, blockers,
  parent/epic, assignee, and priority belong in structured fields/links — not buried
  in the description where boards and automation can't see them.
- **Surface unknowns.** Capture open questions instead of guessing. A decision the
  author cannot make is an Open Question, never a silent assumption shipped as fact.
- **Right-size the detail.** A one-hour chore does not need six sections. A migration,
  epic, or cross-cutting change does. Use judgment.

## Phase 1: Gather Context

Confirm the facts the ticket depends on before writing:

- **Target:** Which repo/branch/service or project/epic the work lands in.
- **Current state:** Read the relevant files, schema, config, or infra so the ticket
  reflects what exists today.
- **Motivation:** Why now? What problem or cost does it address? Express impact as
  concrete costs (support load, user confusion, risk, spend), not just symptoms.
- **Provenance + identifiers:** Capture the source (chat permalink, escalation, spec
  doc) AND the durable IDs needed to act — entity/record ids, app version, device/OS,
  `file:line`. Do not rely on pasted-image or `blob:` links that won't render for the
  assignee; attach durable evidence or describe it in text.
- **For bugs:** Reproduce it, or state the exact confirmed repro. "Couldn't reproduce"
  belongs in triage, not as the ticket's deliverable.
- **Existing home:** Is there already an epic, spec, or backlog this belongs under?
  Link to the parent rather than creating an orphan.

## Phase 2: Choose the Ticket Shape

Pick the lightest structure that fully captures the work.

### Chore / Small change

Single, well-scoped change. Stay light, but still link out.

- Fields: Scope, File(s), Note, Estimate, source doc link.
- Example: add a feature flag, bump a config value, fix a typo'd endpoint.

### Bug

Use the section-headed template so the fix is verifiable against Expected vs Actual:

```markdown
### Impact
Who is affected and what they cannot do.
### Expected behaviour
What should happen.
### Actual behaviour
What happens instead.
### Steps to reproduce
1. ...
2. ...
### Environment
App version, device/OS, surface, affected entity id (redact sensitive data).
### Workarounds
Any temporary unblock for support.
### Other information
Durable evidence, related tickets, provenance link.
```

### Story

```markdown
### User story
As a <role>, I want <capability> so that <outcome>.
### Context
Existing pattern to follow (name the component/module), parallelizable siblings.
### Acceptance criteria
- Observable end states; name the tests/edge cases to cover.
### Other information
- Size: S/M/L | Points: N
- Dependencies: <sibling key(s)>
- Design: <link> (required for UI work; jargon-only asks are not verifiable)
```

### Engineering spec (implementation-ready story)

```markdown
## Scope
The boundary of this change in one or two sentences.
## What to build
- Functions/modules with signatures and the response/log shape.
## Files
- New: path/to/file
- Reuse: path/or/module from <ticket key>
## Acceptance criteria
- Tests named, edge cases listed, privacy/security callouts.
## Dependencies
Depends on <key>; parallelizable with <key>.
```

### Security / audit finding

Bug template plus: **Severity** (with any contingency caveat), an ordered
**Action items** list, and **References** to exact `file:line` + owning repo + epic.

### Feature / Plan / Migration / Epic

Default shape for "publish this plan as a ticket". For an **epic**, keep the body thin
and anchor to the source-of-truth spec doc; let child stories carry executable detail.
Decompose into ordered, prefixed child titles (e.g. `3c.`, `4a.`, `6a.`) so sequencing
is visible on the board.

```markdown
## Summary
One or two sentences in plain language.
## Why
The problem/cost/motivation as concrete bullets.
## Scope
What's included. Add an explicit "Out of scope" list when the boundary is ambiguous.
## Implementation Plan
Ordered, concrete steps; foundations before dependents.
## Acceptance Criteria
Checklist of independently verifiable outcomes.
## Open Questions
Decisions the author cannot make alone, with options where possible.
```

## Phase 3: Writing Rules

- Lead with the Summary/Impact; reviewers skim.
- Prefer concrete nouns (`events` collection, `DATABASE_URL`, a named function) over
  generic ones; backtick code symbols.
- Keep steps in dependency order.
- Phrase acceptance criteria as observable end states ("Production backend connects to
  the new datastore"), not activities ("work on connection").
- Do not invent data, owners, timelines, labels, or components that were not provided
  or confirmed.

## Phase 4: Get Approval

Show the full drafted title and body in chat. Ask for approval. Apply requested edits.
Only publish once the user confirms.

## Phase 5: Publish

Create the ticket in whatever tracker the project uses (its CLI, API, or UI). Preserve
markdown formatting in the body.

Set the structured fields the tracker offers — do not encode them in the title or
description:

- **Issue type:** epic / story / task / bug / spike.
- **Parent/epic:** link via the native parent or epic field.
- **Assignee:** set an owner; avoid filing unowned work into active work.
- **Priority:** set a real priority; don't leave a default that carries no signal.
- **Links:** model blocks/depends-on/relates as issue links, not prose.
- **Components/area:** map to the owning repo or area where the tracker supports it.
- **Labels:** apply only labels that already exist for routing/triage; do not invent.
- **Sizing/sprint:** record sizing/iteration where the tracker or body supports it.

Cross-tool linking: link the spec/design/source doc, and for chat-sourced work keep a
provenance link. When a design or technical doc exists, link it back from the ticket.

After creating, return the ticket URL/key to the user.

## Title Guidance

- Specific and scannable; front-load the subject. "Migrate analytics storage to the new
  datastore", not "storage stuff" or "Migration script".
- A title must make sense without opening the parent.
- Use code symbols (in backticks) or short area prefixes where they aid triage.
- Do NOT encode status in the title (no `(Blocked)`); use the status field/links.
- No trailing punctuation; keep it under ~70 characters.

## Smell Checks

- The ticket restates the chat (or just links out) instead of being self-contained.
- A bug has no repro, environment, or durable IDs — or its deliverable is "investigate if real."
- Evidence is a `blob:`/pasted-image link that won't render for the assignee.
- Scope is open-ended ("improve performance") with no boundary.
- Acceptance criteria can't be verified by a reviewer; UI work has no design link.
- The plan lists activities, not outcomes.
- Real decisions are hidden as assumptions instead of Open Questions.
- An epic is empty/placeholder with no linked spec and no exit criteria.
- Dependencies/blockers/parent/owner/priority live in prose instead of fields.
- The title needs the parent for context, or carries status noise.
- Labels, assignees, components, or milestones were invented rather than confirmed.
- The ticket was created before the user approved the draft.

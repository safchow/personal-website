---
name: personal-project-case-studies
description: Write concise, evidence-led case study copy for personal projects on this portfolio site.
disable-model-invocation: true
---

# Personal Project Case Studies

Use this when the user asks for case study copy, project writeups, or portfolio
project descriptions for this website.

## Inputs

Ask for or infer:
- Project name and one-line purpose
- Audience or reader to impress
- Role, timeline, stack, and constraints
- Links, screenshots, repo paths, product notes, or existing copy
- Analytics or usage evidence, if available

If analytics are missing, say what would help and draft from observable product
facts without pretending there is traction.

## Research Workflow

1. Read the relevant project code, README, UI copy, and routes before writing.
2. Check analytics early when available. For this repo, anonymous pageview and
   click events live behind the backend `GET /api/events` endpoint and may
   include `type`, `target`, `path`, `sessionId`, `timestamp`, and metadata.
3. Convert evidence into plain claims: visits, repeated sessions, clicked CTAs,
   popular paths, device context, or usage gaps.
4. Separate facts from interpretation. Do not invent metrics, users, revenue,
   adoption, or impact.
5. Trim hard. Keep only details that clarify the problem, the build, or the
   result.

## Case Study Shape

Prefer a compact structure:
- **Title:** specific project name, not a clever headline.
- **Deck:** one sentence on who it helps and what changed.
- **Context:** the problem, constraint, or reason this was worth building.
- **Build:** 2-4 concrete decisions, tradeoffs, or systems.
- **Evidence:** analytics, usage signals, tests, deployment, or shipped behavior.
- **Result:** what exists now and what was learned.
- **Next:** one honest follow-up, only if it adds value.

For landing-page cards, compress to a title plus 1-2 direct sentences. For a
full case study, aim for 400-700 words unless the user asks otherwise.

## Voice

- Sound like a senior full-stack engineer, not a marketer.
- Use short paragraphs, concrete nouns, and simple verbs.
- Prefer "built", "shipped", "tracked", "reduced", "learned" over hype.
- Avoid inflated language: "revolutionary", "seamless", "robust", "world-class",
  "delightful", "leveraged", "cutting-edge".
- Keep the landing page quick to scan; save detail for the case study page.
- Name uncertainty directly: "early signal", "small sample", "no usage data yet".

## Output Template

```md
# <Project Name>

<One-sentence deck.>

## Context
<Why this project exists.>

## What I Built
- <Concrete decision or feature.>
- <Concrete decision or feature.>
- <Concrete decision or feature.>

## Evidence
<Analytics or observed signals. If none, say so plainly.>

## Result
<Current state, outcome, and one useful lesson.>
```

End with a short note listing the facts used and any assumptions that need the
user's confirmation.

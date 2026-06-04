Personal portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – build tool
- **Tailwind CSS v4** – styling
- **TanStack Router** – routing
- **ShadCN/Radix UI components** – colocated in the frontend app

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev
```

The site will be available at `http://localhost:5173` (or the next available port).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the workspace development servers |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript checks |

## Project Structure

```
website/
├── frontend/     # Main web app (Vite + React)
├── core/         # MongoDB client, config, shared utilities
├── backend/      # Express API (analytics, etc.)
└── package.json  # Monorepo root
```

## Backend (Analytics API)

The backend provides an events API for anonymous analytics. Both development and
production use **MongoDB Atlas** as the application database. (A local Docker
MongoDB replica set is used only by the e2e test suite — see Testing.)

**Local development setup (Atlas):**
```bash
# Copy env and point DATABASE_URL at your Atlas SRV connection string
cp backend/.env.example backend/.env
# edit backend/.env: set DATABASE_URL=mongodb+srv://...

pnpm --filter @website/core build
pnpm --filter @website/backend dev
```

The `events` collection and its indexes (`sessionId` + the `timestamp` TTL
index) are created automatically the first time the backend boots — there is no
separate schema/migration step.

See [docs/atlas-migration-runbook.md](docs/atlas-migration-runbook.md) for the
full Atlas + Railway provisioning steps.

**Endpoints:**
- `POST /api/events` – Track events (body: `{ sessionId, type: "click"|"pageview", target?, path? }`)
- `GET /api/events/stats?path=&type=&target=` – Aggregate event count + unique sessions (filter by `type` and/or `target`)
- `GET /api/healthcheck` – Health check

**Data retention:** raw analytics events expire automatically via a MongoDB TTL
index on `events.timestamp`, configured with `ANALYTICS_RETENTION_DAYS`
(default 730 — 2 years). The index is ensured at backend startup.

**Deploy to Railway:**
- Use the root `Dockerfile` (builds core + backend)
- Set `DATABASE_URL` to your MongoDB Atlas SRV connection string
- Set `CLIENT_URL` to your production frontend URL
- Optionally set `ANALYTICS_RETENTION_DAYS` (defaults to 730)

## Testing

The backend e2e suite runs against a local single-node MongoDB replica set, not
Atlas, so test data is isolated and disposable:
```bash
pnpm docker:up            # start local Mongo replica set on :27017
pnpm test:backend:e2e     # run the Playwright API integration tests
```

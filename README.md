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
├── core/         # Prisma schema, config, shared utilities
├── backend/      # Express API (analytics, etc.)
└── package.json  # Monorepo root
```

## Backend (Analytics API)

The backend provides an events API for anonymous analytics.

**Local setup with Docker MongoDB:**
```bash
# Start MongoDB
docker compose up -d mongodb

# Copy env and run backend
cp backend/.env.example backend/.env
pnpm --filter @website/core prisma:generate
pnpm --filter @website/backend dev
```

**Manual setup:**
1. Copy `backend/.env.example` to `backend/.env`
2. Set `DATABASE_URL` (use `mongodb://localhost:27017/website` for local Docker)
3. Set `CLIENT_URL` to your frontend URL (e.g. `http://localhost:5173`)
4. Run `pnpm --filter @website/core prisma:generate`
5. Run `pnpm --filter @website/backend dev`

**Endpoints:**
- `POST /api/events` – Track events (body: `{ sessionId, type: "click"|"pageview", target?, path? }`)
- `GET /api/healthcheck` – Health check

**Deploy to Railway:**
- Use the root `Dockerfile` (builds core + backend)
- Set `DATABASE_URL` to your MongoDB Atlas (or Railway MongoDB) connection string
- Set `CLIENT_URL` to your production frontend URL

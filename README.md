# Safwaan

Personal portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – build tool
- **Tailwind CSS v4** – styling
- **TanStack Router** – routing
- **@website/stones** – shared UI component library (Radix, etc.)

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server (stones + frontend)
pnpm dev
```

The site will be available at `http://localhost:5173` (or the next available port).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start stones (watch) + frontend dev server |
| `pnpm build` | Build stones, then all packages |
| `pnpm build:stones` | Build the stones component library only |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript checks |

## Project Structure

```
website/
├── frontend/     # Main web app (Vite + React)
├── stones/       # Shared UI component library
└── package.json  # Monorepo root
```

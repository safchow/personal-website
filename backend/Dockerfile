# Multi-stage build for backend service
# Build context: repo root (docker build -f backend/Dockerfile .)
FROM node:18-alpine AS base

RUN apk add --no-cache python3 make g++ && \
    corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json for workspace packages
COPY core/package.json ./core/
COPY backend/package.json ./backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY core ./core
COPY backend ./backend

# Generate Prisma client and build core
RUN cd core && pnpm exec prisma generate --schema=./prisma/schema.prisma
RUN pnpm --filter @website/core build

# Build backend
RUN pnpm --filter @website/backend build

# Production stage
FROM node:18-alpine AS production

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy package files
COPY --from=base /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=base /app/core/package.json ./core/
COPY --from=base /app/backend/package.json ./backend/

# Copy node_modules
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/core/node_modules ./core/node_modules
COPY --from=base /app/backend/node_modules ./backend/node_modules

# Copy built code
COPY --from=base /app/core/dist ./core/dist
COPY --from=base /app/backend/dist ./backend/dist

# Copy Prisma schema (for client generation)
COPY --from=base /app/core/prisma ./core/prisma

# Regenerate Prisma client for production
RUN pnpm --filter @website/core prisma:generate

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["pnpm", "--filter", "@website/backend", "start"]

# Multi-stage build for frontend (static assets)
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Accept build-time arguments for Vite environment variables
# Railway automatically passes environment variables as build args
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Copy root package files and lockfile for reproducible install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json files for all workspaces
COPY frontend/package.json ./frontend/

# Install dependencies (lockfile ensures correct native bindings for Alpine)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY frontend ./frontend

# Build frontend
RUN pnpm --filter @website/frontend build

# Production stage - serve static files with nginx
FROM nginx:alpine AS production

# Railway injects PORT - nginx must listen on it
ENV PORT=8080

# Copy built static assets
COPY --from=base /app/frontend/dist /usr/share/nginx/html

# Copy nginx config template (PORT is substituted at runtime)
COPY frontend/nginx.conf.template /etc/nginx/templates/default.conf.template

# Health check (use shell so $PORT expands at runtime)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/bin/sh", "-c", "wget --quiet --tries=1 --spider http://localhost:${PORT:-8080}/ || exit 1"]

# nginx:alpine runs envsubst on templates in /docker-entrypoint.d/
CMD ["nginx", "-g", "daemon off;"]



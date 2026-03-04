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
COPY stones/package.json ./stones/
COPY frontend/package.json ./frontend/

# Install dependencies (lockfile ensures correct native bindings for Alpine)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY stones ./stones
COPY frontend ./frontend

# Build dependencies first
RUN pnpm --filter @website/stones build

# Build frontend
RUN pnpm --filter @website/frontend build

# Production stage - serve static files with nginx
FROM nginx:alpine AS production

# Copy built static assets
COPY --from=base /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration (optional - for SPA routing)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]



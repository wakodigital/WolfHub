# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json turbo.json ./

# Copy all packages
COPY packages ./packages

# Copy backend
COPY apps/api ./apps/api

# Install dependencies
RUN npm ci

# Build backend (and its dependencies)
RUN npm run build --filter=@wolfhub/api

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built backend
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

# Copy packages
COPY --from=builder /app/packages ./packages

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]
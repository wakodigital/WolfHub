# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json turbo.json ./

# Copy backend and its dependencies
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/database ./packages/database
COPY apps/api ./apps/api

# Install dependencies
RUN npm ci

# Build backend (and its dependencies)
RUN npm run build --filter=@wolfhub/api

# Stage 2: Runtime
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy built backend
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

# Copy Prisma schema and generated client (if exists)
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma 2>/dev/null || true
COPY --from=builder /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma 2>/dev/null || true

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]

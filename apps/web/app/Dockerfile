# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json turbo.json ./

# Copy frontend and its dependencies
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY apps/web ./apps/web

# Install dependencies
RUN npm ci

# Build frontend
RUN npm run build --filter=@wolfhub/web

# Stage 2: Runtime
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy built frontend
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/types ./packages/types
COPY --from=builder /app/packages/utils ./packages/utils

EXPOSE 3000

CMD ["npm", "start", "--prefix", "apps/web"]
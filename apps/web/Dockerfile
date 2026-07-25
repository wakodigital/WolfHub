FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json turbo.json tsconfig.json ./ 

# Copy all packages
COPY packages ./packages

# Copy frontend
COPY apps/web ./apps/web

# Install dependencies
RUN npm ci

# Build frontend
RUN npm run build --filter=@wolfhub/web

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built frontend
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

EXPOSE 3000

CMD ["npm", "start", "--prefix", "apps/web"]
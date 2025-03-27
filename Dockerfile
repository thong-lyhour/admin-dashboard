# syntax=docker.io/docker/dockerfile:1

# Base image
FROM node:23-alpine3.20 AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /src/app
COPY --from=deps /src/app/node_modules ./node_modules
COPY . .
# Use the appropriate .env file for the environment
ARG ENV_FILE=.env.development
COPY ${ENV_FILE} .env
RUN yarn build

# Production image
FROM base AS runner
WORKDIR /src/app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

# Copy necessary files from the builder stage
COPY --from=builder /src/app/public ./public
# COPY --from=builder /src/app/.next/standalone ./
COPY --from=builder /src/app/.next/static ./.next/static

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
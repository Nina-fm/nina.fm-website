# Dockerfile multi-stage pour Nina.fm Website
FROM node:20-alpine AS base

# Enable corepack and pnpm
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# Set working directory
WORKDIR /app

# Dependencies stage
FROM base AS dependencies

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM dependencies AS development

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]

# Build stage
FROM dependencies AS build

# Build args for Nuxt environment variables
ARG NUXT_PUBLIC_AUDIO_STREAM_URL
ARG NUXT_PUBLIC_API_URL
ARG NUXT_PUBLIC_API_STREAM_ENDPOINT

# Set environment variables for Nuxt build
ENV NUXT_PUBLIC_AUDIO_STREAM_URL=${NUXT_PUBLIC_AUDIO_STREAM_URL}
ENV NUXT_PUBLIC_API_URL=${NUXT_PUBLIC_API_URL}
ENV NUXT_PUBLIC_API_STREAM_ENDPOINT=${NUXT_PUBLIC_API_STREAM_ENDPOINT}

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

# Enable corepack
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

WORKDIR /app

# Copy built application
COPY --from=build --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=build --chown=nuxtjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nuxtjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies (skip scripts)
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

USER nuxtjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Use the built server directly
CMD ["node", ".output/server/index.mjs"]

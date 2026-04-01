# Use the official Bun image
FROM oven/bun:1.3.5-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun --bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 -G nodejs nextjs

RUN mkdir .next
RUN mkdir data
RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs data

RUN chown nextjs:nodejs /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs entrypoint.sh ./

RUN chmod 755 /app/entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT [ "/bin/ash", "/app/entrypoint.sh" ]

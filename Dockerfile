# === ЭТАП ЗАВИСИМОСТЕЙ (deps) ===
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# === ЭТАП СБОРКИ (builder) ===
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Передача фиктивных значений для секретов на этапе сборки
ARG NEXT_PUBLIC_SERVER_URL=dummy
ARG NEXT_PUBLIC_BASE_URL=dummy
ARG DATABASE_URI=dummy
ARG PAYLOAD_SECRET=dummy
ARG CRON_SECRET=dummy
ARG SMTP_HOST=dummy
ARG SMTP_USER=dummy
ARG SMTP_PASS=dummy
ARG RABBITMQ_URL=dummy
ARG S3_BUCKET=dummy
ARG S3_REGION=dummy
ARG S3_ENDPOINT=dummy
ARG S3_ACCESS_KEY_ID=dummy
ARG S3_SECRET_ACCESS_KEY=dummy
ARG NEXT_PUBLIC_YANDEX_METRIKA=dummy

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV CRON_SECRET=$CRON_SECRET
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASS=$SMTP_PASS
ENV RABBITMQ_URL=$RABBITMQ_URL
ENV S3_BUCKET=$S3_BUCKET
ENV S3_REGION=$S3_REGION
ENV S3_ENDPOINT=$S3_ENDPOINT
ENV S3_ACCESS_KEY_ID=$S3_ACCESS_KEY_ID
ENV S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_YANDEX_METRIKA=$NEXT_PUBLIC_YANDEX_METRIKA

RUN pnpm build

# === ФИНАЛЬНЫЙ ОБРАЗ (runner) ===
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Только production-зависимости
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Копирование результатов сборки
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Копирование файлов для воркеров
COPY --from=builder /app/workers.ts ./workers.ts
COPY --from=builder /app/shared/workers ./shared/workers

EXPOSE 3000
CMD ["pnpm", "start"]

# Базовый образ для установки зависимостей
FROM node:20-alpine AS deps
WORKDIR /app

# Установка pnpm
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app

# Установка pnpm в этапе builder
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Финальный образ для продакшена
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Установка только продакшен-зависимостей
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Копирование результатов сборки
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Порт, на котором работает Next.js
EXPOSE 3000

# Команда для запуска
CMD ["pnpm", "start"]
# Etap 1: build
FROM node:18-alpine AS builder
WORKDIR /app

COPY . .

RUN npm install -g nx && npm install
RUN nx build backend

# Etap 2: runtime
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN npm install --omit=dev

CMD ["node", "dist/main.js"]

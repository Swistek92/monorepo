# ================================
# Etap 1: Build
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g nx
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN nx build backend --with-deps

# ================================
# Etap 2: Runtime
# ================================
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist/apps/backend ./dist/apps/backend
COPY --from=builder /app/dist/consts ./dist/consts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/apps/backend/.env ./
COPY tsconfig.runtime.json ./tsconfig.json

RUN npm install --omit=dev tsconfig-paths

CMD ["node", "-r", "tsconfig-paths/register", "dist/apps/backend/src/main.js"]

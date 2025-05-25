FROM node:18-slim AS builder

WORKDIR /app

ENV NX_DAEMON=false
ENV NX_VERBOSE_LOGGING=true

# RUN npm install -g nx

COPY nx.json ./
COPY tsconfig.base.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npx nx run frontend:build --configuration=production

# === Serwowanie przez nginx ===
FROM nginx:1.25-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/apps/frontend/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

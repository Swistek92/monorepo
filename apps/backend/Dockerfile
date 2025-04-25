# ================================
# Etap 1: Build
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Instalacja nx
RUN npm install -g nx

# Kopiowanie plików package.json i package-lock.json do kontenera
COPY ../package.json ./
COPY ../package-lock.json ./


# Instalacja zależności
RUN npm ci --legacy-peer-deps

# Kopiowanie całej aplikacji do kontenera
COPY . .

# Budowanie backendu z zależnościami
RUN nx build backend --with-deps

# ================================
# Etap 2: Runtime
# ================================
FROM node:20-alpine
WORKDIR /app

# Kopiowanie zbudowanego backendu z etapu build do kontenera
COPY --from=builder /app/dist/apps/backend ./dist/apps/backend
COPY --from=builder /app/dist/consts ./dist/consts

# Kopiowanie package.json i package-lock.json z etapu build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Kopiowanie pliku .env z backendu
COPY --from=builder /app/apps/backend/.env ./

# Kopiowanie pliku tsconfig.runtime.json i zmiana na tsconfig.json
COPY --from=builder /app/apps/backend/tsconfig.runtime.json ./tsconfig.json

# Instalacja zależności tylko dla produkcji
RUN npm install --omit=dev tsconfig-paths

# Uruchamianie aplikacji z tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "dist/apps/backend/src/main.js"]

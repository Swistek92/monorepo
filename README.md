![Frontend CI](https://github.com/Swistek92/monorepo/actions/workflows/frontend-ci.yml/badge.svg)
![Backend CI](https://github.com/Swistek92/monorepo/actions/workflows/backend.yml/badge.svg)



# 🛍️ Aplikacja e-commerce – Monorepo (Angular + NestJS)

## 📘 Opis projektu

Aplikacja e-commerce zbudowana w architekturze **MVC**, rozwijana w modelu **monorepo** z użyciem Nx. Obsługuje proces rejestracji użytkowników, zarządzania produktami, licytacji i opinii. 

Projekt został stworzony w celu potwierdzenia znajomości wzorca MVC, zarządzania danymi oraz automatyzacji wdrożeń.

---

## 📂 Spis treści

- [Funkcjonalności](#-funkcjonalności)
- [Technologie](#-technologie)
- [Architektura](#-architektura)
- [Struktura katalogów](#-struktura-projektu)
- [Uruchomienie](#-uruchomienie)
- [CI/CD](#-automatyzacja-cicd)
- [Model danych](#-model-danych)
- [Licencja](#-licencja)

---

## ✅ Funkcjonalności

- 🔐 Rejestracja i logowanie (JWT & Google OAuth)
- 👤 Obsługa ról: `USER`, `MODERATOR`, `ADMIN`
- 📦 Dodawanie, edycja, filtrowanie i usuwanie produktów
- 💰 Licytacje i przegląd ofert
- 🧾 Recenzje i oceny produktów
- 💾 Przechowywanie tokenów i sesji
- ⭐ Ulubione produkty
- 🛡️ Autoryzacja oparta na guardach
- 📊 Swagger API dostępne publicznie

---

## 🛠️ Technologie

### Frontend

- Angular 19+, RxJS, TypeScript
- PrimeNG, PrimeIcons
- Zod (walidacja formularzy)
- HttpClient, Lazy Loading
- Custom guards, pipes, dyrektywy

### Backend

- NestJS 11
- TypeORM + PostgreSQL (NeonDB)
- Passport.js (Local, JWT, Google)
- JWT (access/refresh tokens)
- Swagger
- class-validator

---

## 🧱 Architektura

Aplikacja podzielona została zgodnie z wzorcem MVC:

| Warstwa   | Angular (frontend)            | NestJS (backend)              |
|-----------|-------------------------------|-------------------------------|
| Model     | Interfejsy + Store            | Encje + DTO (TypeORM)         |
| View      | HTML + CSS (komponenty)       | Swagger (API View)            |
| Controller| Klasy komponentów i routingi  | Kontrolery + routing REST     |
| Service   | Serwisy komunikacyjne         | Serwisy aplikacyjne           |

---

## 🗂️ Struktura projektu

```
apps/
  frontend/   # Angular SPA
  backend/    # NestJS REST API
  const/      # Wspólny kod (enumy, endpointy)
```

### Frontend:

```
components/    # UI – popupy, formularze, dashboard
layout/        # header, footer
pipes/         # np. price.pipe.ts
services/      # auth, products, store, api
home/, product/ # główne widoki
```

### Backend:

```
auth/      # logika autoryzacji
user/      # dane użytkownika
items/     # produkty i licytacje
review/    # recenzje
seeding/   # dane startowe
```

---

## 🚀 Uruchomienie

Projekt można uruchomić lokalnie w kontenerach Docker.

### Wymagania:

- Docker
- Docker Compose

### Krok 1 – uruchomienie

```bash
docker-compose up --build
```

- Backend będzie dostępny pod: `http://localhost:3000`  
- Frontend (jeśli zintegrowany lokalnie): `http://localhost:4200`  
- Alternatywnie frontend może być hostowany przez **Vercel**
- Alternatywnie backend może być hostowany na Google Kubernetes Engine (GKE)

### Krok 2 – dokumentacja API

Otwórz przeglądarkę i przejdź do:

```bash
http://localhost:3000/api
```

---

## 🔄 Automatyzacja CI/CD

### Backend

Workflow `.github/workflows/backend.yml`:

- ✅ Testy jednostkowe
- 🐳 Budowa i push obrazu Docker (`swistek/my-backend:latest`)
- ☁️ Deploy do Google Kubernetes Engine (GKE)
- 📩 Powiadomienia na Discord

### Frontend

Workflow `.github/workflows/frontend.yml`:

- ✅ Testy jednostkowe (Nx)
- 🚀 Deploy do Vercel przez Webhook
- 📩 Powiadomienie o statusie na Discord

---

## 🛢️ Model danych

Baza danych PostgreSQL z relacjami:

### Kluczowe relacje

| Relacja           | Typ              |
|-------------------|------------------|
| `user → item`     | 1:N (właściciel) |
| `user → bid`      | 1:N              |
| `user → review`   | 1:N              |
| `user → favorites`| N:M              |
| `item → bid`      | 1:N              |
| `item → review`   | 1:N              |

---

## 📝 Licencja

Projekt udostępniony na warunkach licencji **MIT**.

---

## ✍️ Autor

**Piotr Świstowski**  

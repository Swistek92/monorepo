// 🔧 Podstawowa konfiguracja aplikacji (np. URL backendu)
export * from "./lib/baseConf/index"

// 🌐 Endpointy API
export * from "./lib/endpoints/items.endpoints"
export * from "./lib/endpoints/auth.endpoints"
export * from "./lib/endpoints/user.endpoints"
export * from "./lib/endpoints/bids.endpoints"

// 👤 Role użytkowników (np. ADMIN, USER)
export * from "./lib/userRoles/role.enum"

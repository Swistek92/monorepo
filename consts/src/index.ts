export * from "./lib/paginations"
export * from "./lib/types"

// ========================ITEMS=========================
//ENDOPOINTS
export * from "./lib/endpoints/items.endpoints"
// DTO
// export * from "./lib/dto/items/created-item.dto"
// export * from "./lib/dto/items/update-item.dto"
// export * from "./lib/dto/items/create-item.dto"
// export * from "./lib/dto/items/pagination.dto"
// export * from "./lib/dto/items/getAll-items.dto"
// export * from "./lib/dto/items/delete-item.dto"

// ============================AUTH=========================
// ENDPOINTS
export * from "./lib/endpoints/auth.endpoints"
// DTO
// export * from "./lib/dto/auth/login.dto"

// =========================USER=========================
// ENDPOINTS
export * from "./lib/endpoints/user.endopoints"
// DTO
// export * from "./lib/dto/user/profile.dto"
// user role const
export * from "./lib/dto/user/enums/role.enum"

// CONSTAS
export const basebackendUrl = "http://localhost:3000"
export const basefrontendUrl = "http://localhost:4200"

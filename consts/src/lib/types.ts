// export type Products = {
//   items: Product[]
//   total: number
//   page: number
//   perPage: number
//   totalPages: number
// }

// export type Product = {
//   id: number
//   name: string
//   image: string
//   price: string
//   rating: number
//   ownerId: number
//   ownerEmail: string
//   avatar: string
//   description: string
//   createdAt: string
//   category: string
//   available: boolean
//   views: number
//   tags: string[]
//   location: string
// }

export type PaginationParams = {
  skip: number
  limit: number
} & Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>

export type PopupMode = "add" | "edit" | "view" | "custom" | null

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export type UserRole = "admin" | "user"

export type AuthUser = {
  id: number
  email: string
  password: string
  name: string
  role: UserRole
  isActive: boolean
  verified: boolean
  avatar: string
  createdAt: string
  lastLogin: string | null
  favorites: number[]
}

export type RegisterPayload = {
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RefreshResponse = {
  accessToken: string
}

export type UpdateUserPayload = {
  email?: string
  name?: string
  role?: "admin" | "user"
  isActive?: boolean
  verified?: boolean
  avatar?: string
  [key: string]: any
}

export type Bid = {
  id: number
  productId: number
  userId: number
  userName: string
  avatar: string
  amount: number
  createdAt: string // ISO date string
}

export type CreateBidPayload = {
  productId: number
  userId: number
  userName: string
  avatar: string
  amount: number
}

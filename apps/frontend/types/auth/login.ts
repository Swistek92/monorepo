import { Role } from "@my-monorepo/consts"
import { z } from "zod"
import { bidSchema } from "../bids/bid.type"
import { createdItemSchema } from "../items/items.type"

export const roleEnum = z.enum([Role.ADMIN, Role.MODERATOR, Role.USER])

// temp
export const reviewSchema = z.object({
  id: z.number(),
  content: z.string().optional(), // lub inne pola recenzji
})
// temp

export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  roles: z.array(roleEnum),
  isActive: z.boolean(),
  verified: z.boolean(),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastLogin: z.string().datetime().optional(),
  hashedRefreshToken: z.string().optional(),
  bids: z.array(bidSchema).optional(),
  ownedItems: z.array(createdItemSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
})

export const LoginDto = z.object({
  email: z.string().email({ message: "Email musi być poprawny" }),
  password: z.string().min(4, { message: "Hasło musi mieć minimum 4 znaki" }),
})

// Jeśli potrzebujesz typ TypeScript:
export type LoginDtoType = z.infer<typeof LoginDto>

export const safeUserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().optional(),
  roles: z.array(roleEnum),
  isActive: z.boolean(),
  verified: z.boolean(),
  avatar: z.string().url().optional(),
  createdAt: z.string(), // ISO
  updatedAt: z.string(),
  lastLogin: z.string().nullable().optional(),
})

export type SafeUser = z.infer<typeof safeUserSchema>

// AuthResponse, np. dla loginu:
export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: SafeUser
}

export type LoginPayload = {
  email: string
  password: string
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}
export type RegisterPayload = {
  email: string
  password: string
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
export type PopupMode = "add" | "edit" | "view" | "custom" | null
export type CreateBidPayload = {
  productId: number
  userId: number
  userName: string
  avatar: string
  amount: number
}
// export type Bid = {
//   id: number
//   productId: number
//   userId: number
//   userName: string
//   avatar: string
//   amount: number
//   createdAt: string // ISO date string
// }

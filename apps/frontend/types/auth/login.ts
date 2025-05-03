import { Role } from "@my-monorepo/consts"
import { z } from "zod"

export const LoginDto = z.object({
  email: z.string().email({ message: "Email musi być poprawny" }),
  password: z.string().min(4, { message: "Hasło musi mieć minimum 4 znaki" }),
})

// Jeśli potrzebujesz typ TypeScript:
export type LoginDtoType = z.infer<typeof LoginDto>

export const roleEnum = z.enum(["ADMIN", "MODERATOR", "USER"])

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

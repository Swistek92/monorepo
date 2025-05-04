import { z } from "zod"
import { safeUserSchema } from "../types"

export const bidSchema = z.object({
  id: z.number(),
  amount: z.number().positive(),

  createdAt: z.string().datetime(),
  lastUpdate: z.string().datetime(),

  userName: z.string(),
  userEmail: z.string().email(),
  userAvatar: z.string().url().nullable().optional(),

  product: z.object({
    id: z.number(),
  }),
  userId: z.number(),
  user: safeUserSchema,
})

// 👉 TypeScript typ
export type Bid = z.infer<typeof bidSchema>

export const createBidSchema = z.object({
  id: z
    .number({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be a number",
    })
    .int()
    .positive(),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),
})

// 👉 Typy dla TypeScript (opcjonalnie)
export type CreateBidInput = z.infer<typeof createBidSchema>

export const deleteBidSchema = z.object({
  id: z
    .number({
      required_error: "Bid ID is required",
      invalid_type_error: "Bid ID must be a number",
    })
    .int()
    .positive("Bid ID must be a positive number"),
})

// 👉 Typ dla TypeScript (opcjonalnie)
export type DeleteBidInput = z.infer<typeof deleteBidSchema>

export const updateBidSchema = z.object({
  id: z
    .number({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be a number",
    })
    .int()
    .positive("Product ID must be a positive number"),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  bidId: z
    .number({
      required_error: "Bid ID is required",
      invalid_type_error: "Bid ID must be a number",
    })
    .int()
    .positive("Bid ID must be a positive number"),
})

// 👉 Typ do TypeScript (opcjonalnie)
export type UpdateBidInput = z.infer<typeof updateBidSchema>

import { z } from "zod"

export const LoginDto = z.object({
  email: z.string().email({ message: "Email musi być poprawny" }),
  password: z.string().min(4, { message: "Hasło musi mieć minimum 4 znaki" }),
})

// Jeśli potrzebujesz typ TypeScript:
export type LoginDtoType = z.infer<typeof LoginDto>

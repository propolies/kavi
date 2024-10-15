import z from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3, "Your name has to be at least 3 characters"),
  age: z.number().min(18, "You have to be at least 18 years old"),
  password: z.string().min(5, "Password too weak")
})
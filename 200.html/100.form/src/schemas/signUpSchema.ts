import { z } from 'zod'

export const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.string().default('none').optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
})

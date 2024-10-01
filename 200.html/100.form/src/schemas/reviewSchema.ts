import { z } from 'zod'

export const reviewSchema = z.object({
  name: z.string().min(1),
  text: z.string(),
  star: z.number().min(1).max(5),
  image: z.string().optional(),
})

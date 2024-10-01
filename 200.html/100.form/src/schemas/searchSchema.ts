import { z } from 'zod'

export const searchSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  costMin: z.number().optional(),
  costMax: z.number().optional(),
  sortBy: z.enum(['title', 'totalStar', 'sold', 'releaseDate']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

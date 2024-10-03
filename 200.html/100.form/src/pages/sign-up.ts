import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { users } from '../data/users'
import dayjs from 'dayjs'
import { withErrorHandling } from '../utils/withErrorHandling'

export const POST = withErrorHandling((async ({ redirect, request }) => {
  const formData = Object.fromEntries(await request.formData())
  const data = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string(),
      gender: z.enum(['male', 'female', 'none']),
      dateOfBirth: z.string(),
      country: z.string(),
    })
    .parse(formData)
  users.push({
    ...data,
    dateOfBirth: dayjs(data.dateOfBirth).toDate(),
  })
  return redirect('/users')
}) as APIRoute)

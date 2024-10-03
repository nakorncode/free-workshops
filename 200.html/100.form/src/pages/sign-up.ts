import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { users } from '../data/users'
import dayjs from 'dayjs'

function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const POST: APIRoute = async ({ redirect, request }) => {
  try {
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        message:
          error instanceof Error
            ? isJson(error.message)
              ? JSON.parse(error.message)
              : error.message
            : 'Unexpected error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

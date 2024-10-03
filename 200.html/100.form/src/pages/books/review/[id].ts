import type { APIRoute } from 'astro'
import { withErrorHandling } from '../../../utils/withErrorHandling'
import { z } from 'astro/zod'
import fs from 'node:fs'
import { v4 } from 'uuid'
import path from 'node:path'
import { books } from '../../../data/books'

export const POST = withErrorHandling((async ({
  redirect,
  params,
  request,
}) => {
  const formData = await request.formData()
  const data = z
    .object({
      name: z.string(),
      text: z.string(),
      image: z.instanceof(File).optional(),
      star: z.number(),
    })
    .parse({
      name: formData.get('name'),
      text: formData.get('text'),
      image: formData.get('image'),
      star: Number(formData.get('star')),
    })
  const book = books[+(params.id as string) - 1]
  if (!book) {
    return new Response('ไม่พบรหัสหนังสือที่รีวิว', { status: 404 })
  }
  let imagePath
  if (data.image && data.image.size > 0) {
    const { image } = data
    const fileName = `${v4()}${path.extname(data.image.name)}`
    imagePath = 'uploads/' + fileName
    const writeStream = fs.createWriteStream('public/' + imagePath)
    const buffer = Buffer.from(await image.arrayBuffer())
    writeStream.on('close', () => {
      return
    })
    writeStream.write(buffer)
    await new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(true)
      })
      writeStream.on('error', (error) => {
        reject(new Response('Error uploading file', { status: 500 }))
      })
      writeStream.end()
    })
  }
  book.reviews.push({
    ...data,
    image: '/' + imagePath,
  })
  return redirect('/books')
}) as APIRoute)

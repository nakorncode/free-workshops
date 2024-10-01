import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { HomeView } from './views/home'
import '@unocss/reset/tailwind.css'

const app = new Hono()

interface Book {
  title: string
  author: string
  cost: number
  sold: number
  reviews: {
    name: string
    text: string
    star: number
  }[]
  releasedDate: Date
}

const books: Book[] = [
  //
]

app.get('/', (c) => {
  return c.html(<HomeView></HomeView>)
})

export default app

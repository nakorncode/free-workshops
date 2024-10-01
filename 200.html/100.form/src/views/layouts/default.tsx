import type { FC } from 'hono/jsx'

export const DefaultLayout: FC = (props) => {
  return (
    <>
      <html lang="th">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Bookstore (Frontend form submit tester)</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div className="container mx-auto my-6">{props.children}</div>
        </body>
      </html>
    </>
  )
}

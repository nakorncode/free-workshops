import { FC } from 'hono/jsx'
import { DefaultLayout } from './layouts/default'

export const HomeView: FC = () => {
  return (
    <DefaultLayout>
      <h1 class="text-xl font-bold">
        รายการ API สำหรับฝึกใช้งาน HTML Form Submission
      </h1>
      <ul class="list-disc pl-6 mt-2 text-lg">
        <li></li>
      </ul>
    </DefaultLayout>
  )
}

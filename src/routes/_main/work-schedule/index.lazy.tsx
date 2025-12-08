import { createLazyFileRoute } from '@tanstack/react-router'
import WorkSchedule from '@/pages/work-schedule'

export const Route = createLazyFileRoute('/_main/work-schedule/')({
  component: WorkSchedule,
})

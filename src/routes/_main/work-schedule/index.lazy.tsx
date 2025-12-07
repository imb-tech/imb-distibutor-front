import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/work-schedule/')({
  component: () => <div>Hello /_main/work-schedule/!</div>,
})

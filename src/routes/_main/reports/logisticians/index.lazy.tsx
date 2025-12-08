import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/reports/logisticians/')({
  component: () => <div>Hello /_main/reports/logisticians/!</div>,
})

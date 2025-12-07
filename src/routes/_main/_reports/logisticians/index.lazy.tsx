import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/logisticians/')({
  component: () => <div>Hello /_main/reports/logisticians/!</div>,
})

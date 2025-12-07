import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/drivers/')({
  component: () => <div>Hello /_main/reports/drivers/!</div>,
})

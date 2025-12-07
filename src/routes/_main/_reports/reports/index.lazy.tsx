import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/reports/')({
  component: () => <div>Hello /_main/reports/!</div>,
})

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/agents/')({
  component: () => <div>Hello /_main/reports/agent/!</div>,
})

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/warehouse')({
  component: () => <div>Hello /_main/settings/warehouse!</div>,
})

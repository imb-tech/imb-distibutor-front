import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/drivers')({
  component: () => <div>Hello /_main/settings/drivers!</div>,
})

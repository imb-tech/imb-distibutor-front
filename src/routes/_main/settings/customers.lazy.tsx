import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/customers')({
  component: () => <div>Hello /_main/settings/customers!</div>,
})

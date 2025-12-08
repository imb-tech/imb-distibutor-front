import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/products')({
  component: () => <div>Hello /_main/settings/products!</div>,
})

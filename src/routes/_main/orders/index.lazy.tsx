import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/orders/')({
  component: () => <div>Hello /_main/orders/!</div>,
})

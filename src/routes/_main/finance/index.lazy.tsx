import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/finance/')({
  component: () => <div>Hello /_main/finance/!</div>,
})

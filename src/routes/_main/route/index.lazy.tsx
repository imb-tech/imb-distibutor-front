import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/route/')({
  component: () => <div>Hello /_main/route/!</div>,
})

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/cars')({
  component: () => <div>Hello /_main/settings/cars!</div>,
})

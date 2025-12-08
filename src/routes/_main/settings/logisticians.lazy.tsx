import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/logisticians')({
  component: () => <div>Hello /_main/settings/logisticians!</div>,
})

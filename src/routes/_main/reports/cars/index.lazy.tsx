import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/reports/cars/')({
  component: () => <div>Hello /_main/reports/cars/!</div>,
})

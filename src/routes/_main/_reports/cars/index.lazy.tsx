import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/cars/')({
  component: () => <div>Hello /_main/reports/cars/!</div>,
})

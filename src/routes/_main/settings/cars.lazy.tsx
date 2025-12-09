import { createLazyFileRoute } from '@tanstack/react-router'
import Cars from '@/pages/settings/cars'
export const Route = createLazyFileRoute('/_main/settings/cars')({
  component: Cars,
})

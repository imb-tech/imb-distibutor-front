import { createLazyFileRoute } from '@tanstack/react-router'
import Drivers from '@/pages/settings/drivers'
export const Route = createLazyFileRoute('/_main/settings/drivers')({
  component: Drivers,
})

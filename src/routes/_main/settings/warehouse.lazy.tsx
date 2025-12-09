import { createLazyFileRoute } from '@tanstack/react-router'
import Warehouse from '@/pages/settings/warehouse'

export const Route = createLazyFileRoute('/_main/settings/warehouse')({
  component: Warehouse,
})

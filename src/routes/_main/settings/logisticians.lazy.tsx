import { createLazyFileRoute } from '@tanstack/react-router'
import Logisticians from '@/pages/settings/logisticians'
export const Route = createLazyFileRoute('/_main/settings/logisticians')({
  component: Logisticians,
})

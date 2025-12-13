import { createLazyFileRoute } from '@tanstack/react-router'
import Shippers from '@/pages/settings/shippers'

export const Route = createLazyFileRoute('/_main/settings/shippers')({
  component: Shippers,
})

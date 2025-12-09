import { createLazyFileRoute } from '@tanstack/react-router'
import Customers from '@/pages/settings/customers'
export const Route = createLazyFileRoute('/_main/settings/customers')({
  component: Customers,
})

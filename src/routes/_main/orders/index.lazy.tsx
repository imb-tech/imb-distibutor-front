import OrdersMain from '@/pages/orders'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/orders/')({
  component: OrdersMain,
})

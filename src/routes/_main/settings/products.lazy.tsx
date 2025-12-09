import { createLazyFileRoute } from '@tanstack/react-router'
import Products from '@/pages/settings/products'
export const Route = createLazyFileRoute('/_main/settings/products')({
  component: Products,
})

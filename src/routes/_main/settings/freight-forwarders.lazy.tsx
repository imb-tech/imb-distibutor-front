import { createLazyFileRoute } from '@tanstack/react-router'
import FreightForwarders from '@/pages/settings/freight-forwarders'
export const Route = createLazyFileRoute('/_main/settings/freight-forwarders')({
  component: FreightForwarders,
})

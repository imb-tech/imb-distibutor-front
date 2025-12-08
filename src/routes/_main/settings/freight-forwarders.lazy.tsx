import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings/freight-forwarders')({
  component: () => <div>Hello /_main/settings/freight-forwarders!</div>,
})

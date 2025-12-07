import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/_reports/freight-forwarders/')(
  {
    component: () => <div>Hello /_main/reports/freight-forwarders/!</div>,
  },
)

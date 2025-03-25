import { Memorix } from '@/components/Memorix'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/front')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div> <Memorix /> <Outlet /></div>
}

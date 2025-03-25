import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
        <div className='flex gap-2'>
            <Link to="/front/topic">话题</Link>
            <Link to="/front/live">直播</Link>
        </div>
        <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
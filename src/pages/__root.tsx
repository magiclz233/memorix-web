import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
        <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  // 添加根路径的重定向
  beforeLoad: () => {
    // 只有当用户访问根路径时才重定向
    if (window.location.pathname === '/') {
      throw redirect({
        to: '/front/photo',
        replace: true
      })
    }
  }
})
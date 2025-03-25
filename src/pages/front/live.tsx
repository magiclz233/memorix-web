// import { FrontLayout } from '@/layouts/FrontLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/front/live')({
  component: RouteComponent,
})

function RouteComponent() {
  // 使用React Tanstack Router管理页面
  return <div>Hello "/front/live"! 直播页面...</div>

  // 使用Layout布局组件管理页面
  // return (
  //   <FrontLayout>
  //     <div>Hello "/front/live"! 直播页面...</div>
  //   </FrontLayout>
  // )
}

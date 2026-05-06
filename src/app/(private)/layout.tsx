import type { ReactNode } from 'react'
import { PrivateRouteRefresh } from '@/features/auth'
import { verifyPrivateSession } from '@/features/auth/server'
import { Sidebar } from '@/widgets/Sidebar'

export default async function PrivateLayout({ children }: { children: ReactNode }) {
   await verifyPrivateSession()

   return (
      <PrivateRouteRefresh>
         <div className="mx-auto w-full max-w-[1280px] px-[60px]">
            <Sidebar />
            <main className="ml-[162px] flex min-w-0 flex-col pt-[60px] pl-6">{children}</main>
         </div>
      </PrivateRouteRefresh>
   )
}

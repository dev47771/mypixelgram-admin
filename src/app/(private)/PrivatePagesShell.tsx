'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/widgets/Sidebar'

export function PrivatePagesShell({ children }: { children: ReactNode }) {
   const pathname = usePathname()
   const hideSidebar = pathname === '/profile' || pathname.startsWith('/profile/')

   return (
      <div className="mx-auto w-full max-w-[1280px] px-[60px]">
         {!hideSidebar && <Sidebar />}
         <main
            className={
               hideSidebar
                  ? 'flex min-w-0 flex-col pt-[60px]'
                  : 'ml-[162px] flex min-w-0 flex-col pt-[60px] pl-6'
            }
         >
            {children}
         </main>
      </div>
   )
}

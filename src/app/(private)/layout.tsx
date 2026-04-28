import type { ReactNode } from 'react'
import { Sidebar } from '@/widgets/Sidebar'

function PrivatePagesLayout({ children }: { children: ReactNode }) {
   return (
      <div className="mx-auto w-full max-w-[1280px] px-[60px]">
         <Sidebar />
         <main className="ml-[162px] flex min-w-0 flex-col pt-[60px] pl-6">{children}</main>
      </div>
   )
}
export default PrivatePagesLayout

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'

type Props = { children: ReactNode }

export function PrivateRouteRefresh({ children }: Props) {
   const pathname = usePathname()
   const router = useRouter()
   const prevPathname = useRef<string | null>(null)

   useEffect(() => {
      if (prevPathname.current === null) {
         prevPathname.current = pathname
         return
      }
      if (prevPathname.current !== pathname) {
         prevPathname.current = pathname
         router.refresh()
      }
   }, [pathname, router])

   return <>{children}</>
}

import type { ReactNode } from 'react'

import { PrivateRouteRefresh } from '@/features/auth'
import { verifyPrivateSession } from '@/features/auth/server'

export default async function PrivateLayout({ children }: { children: ReactNode }) {
   await verifyPrivateSession()

   return <PrivateRouteRefresh>{children}</PrivateRouteRefresh>
}

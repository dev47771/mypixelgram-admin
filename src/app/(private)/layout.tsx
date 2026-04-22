import type { ReactNode } from 'react'

import { verifyPrivateSession } from '@/features/auth/lib/verify-privat-session'
import { PrivateRouteRefresh } from '@/features/auth/ui/PrivateRouteRefresh'

export default async function PrivateLayout({ children }: { children: ReactNode }) {
   await verifyPrivateSession()

   return <PrivateRouteRefresh>{children}</PrivateRouteRefresh>
}

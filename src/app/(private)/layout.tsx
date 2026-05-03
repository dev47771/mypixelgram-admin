import type { ReactNode } from 'react'
import { PrivatePagesShell } from './PrivatePagesShell'

function PrivatePagesLayout({ children }: { children: ReactNode }) {
   return <PrivatePagesShell>{children}</PrivatePagesShell>
}
export default PrivatePagesLayout

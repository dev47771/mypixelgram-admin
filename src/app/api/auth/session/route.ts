import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_AUTH_COOKIE_NAME } from '@/shared/constants/auth'

export async function GET() {
   const store = await cookies()
   const authenticated = Boolean(store.get(ADMIN_AUTH_COOKIE_NAME)?.value)
   return NextResponse.json({ authenticated })
}

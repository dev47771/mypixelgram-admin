import 'server-only'

import { print } from 'graphql'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { ADMIN_CHECKER } from '@/features/auth/api/auth.operations'
import { API_ROUTES } from '@/shared/constants'

const SESSION_EXPIRED_ROUTE = API_ROUTES.auth.sessionExpired
const SESSION_EXPIRED_SERVER_ERROR_ROUTE = `${SESSION_EXPIRED_ROUTE}?error=server_error`
const SESSION_EXPIRED_UNAUTHORIZED_ROUTE = `${SESSION_EXPIRED_ROUTE}?error=unauthorized`

export async function verifyPrivateSession(): Promise<boolean> {
   const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL
   if (!GRAPHQL_URL) return redirect(SESSION_EXPIRED_ROUTE)

   try {
      const cookie = (await headers()).get('cookie')
      const res = await fetch(GRAPHQL_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', Cookie: cookie ?? '' },
         body: JSON.stringify({ query: print(ADMIN_CHECKER) }),
      })
      const { data } = await res.json()

      if (res.ok && data?.AdminChecker) return true
   } catch (e) {
      console.error(e)
      return redirect(SESSION_EXPIRED_SERVER_ERROR_ROUTE)
   }

   return redirect(SESSION_EXPIRED_UNAUTHORIZED_ROUTE)
}

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { print } from 'graphql'

import { ADMIN_CHECKER } from '@/features/auth/api/auth.operations'
import { ADMIN_AUTH_COOKIE_NAME, ROUTES } from '@/shared/constants'

export async function verifyPrivateSession(): Promise<boolean> {
   const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL
   if (!GRAPHQL_URL) throw new Error('NEXT_PUBLIC_GRAPHQL_URL is not configured')

   const cookie = (await headers()).get('cookie')

   const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie ?? '' },
      body: JSON.stringify({ query: print(ADMIN_CHECKER) }),
   })

   const { data } = await res.json()

   if (!data?.AdminChecker) {
      ;(await cookies()).delete(ADMIN_AUTH_COOKIE_NAME)
      return redirect(ROUTES.public.signIn)
   }

   return true
}

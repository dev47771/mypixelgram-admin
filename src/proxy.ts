import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_AUTH_COOKIE_NAME } from '@/shared/constants/auth'
import { ROUTES } from './shared/constants'

export function proxy(req: NextRequest) {
   const { pathname } = req.nextUrl
   const hasAuthCookie = Boolean(req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value)

   if (pathname === '/') {
      const url = req.nextUrl.clone()
      url.pathname = hasAuthCookie ? ROUTES.private.usersList : ROUTES.public.signIn
      return NextResponse.redirect(url)
   }

   const isPrivateRoute = Object.values(ROUTES.private).some(
      path => pathname === path || pathname.startsWith(`${path}/`)
   )

   if (isPrivateRoute && !hasAuthCookie) {
      const url = req.nextUrl.clone()
      url.pathname = ROUTES.public.signIn
      return NextResponse.redirect(url)
   }

   if (pathname === ROUTES.public.signIn && hasAuthCookie) {
      const url = req.nextUrl.clone()
      url.pathname = ROUTES.private.usersList
      return NextResponse.redirect(url)
   }

   return NextResponse.next()
}

export const config = {
   matcher: [
      '/',
      '/sign-in',
      '/users-list/:path*',
      '/statistics/:path*',
      '/payments-list/:path*',
      '/posts-list/:path*',
   ],
}

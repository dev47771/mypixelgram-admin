import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_AUTH_COOKIE_NAME } from '@/shared/constants/auth'
import { ROUTES } from './shared/constants'

export function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl
   const hasAuthCookie = Boolean(req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value)

   if (pathname === '/') {
      const url = req.nextUrl.clone()
      url.pathname = hasAuthCookie ? '/users-list' : '/sign-in'
      return NextResponse.redirect(url)
   }

   const isPrivateRoute = Object.values(ROUTES.private).some(
      path => pathname === path || pathname.startsWith(`${path}/`)
   )

   if (isPrivateRoute && !hasAuthCookie) {
      const url = req.nextUrl.clone()
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
   }

   if (pathname === '/sign-in' && hasAuthCookie) {
      const url = req.nextUrl.clone()
      url.pathname = '/users-list'
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

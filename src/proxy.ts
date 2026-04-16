/* import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
   const token = request.cookies.get('adminAccessToken')?.value
   const { pathname } = request.nextUrl

   const isAuthPage = pathname === '/sign-in'
   const isPrivatePage = pathname.startsWith('/users-list')

   if (pathname === '/') {
      return NextResponse.redirect(new URL(token ? '/users-list' : '/sign-in', request.url))
   }

   if (!token && isPrivatePage) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
   }

   if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/users-list', request.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: ['/', '/sign-in', '/users-list/:path*'],
} */

import { NextRequest, NextResponse } from 'next/server'

const AUTH_COOKIE_NAME = 'adminAccessToken' // замени на реальное имя cookie
const PRIVATE_PATHS = ['/users-list', '/statistics', '/payments-list', '/posts-list']

export function proxy(req: NextRequest) {
   const { pathname } = req.nextUrl
   const hasAuthCookie = Boolean(req.cookies.get(AUTH_COOKIE_NAME)?.value)

   // Корень: / -> sign-in или users-list
   if (pathname === '/') {
      const url = req.nextUrl.clone()
      url.pathname = hasAuthCookie ? '/users-list' : '/sign-in'
      return NextResponse.redirect(url)
   }

   // Неавторизованный на приватный роут -> sign-in
   const isPrivateRoute = PRIVATE_PATHS.some(
      path => pathname === path || pathname.startsWith(`${path}/`)
   )

   if (isPrivateRoute && !hasAuthCookie) {
      const url = req.nextUrl.clone()
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
   }

   // (опционально) Авторизованный не должен открывать sign-in
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

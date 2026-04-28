import { NextResponse } from 'next/server'

import { ROUTES } from '@/shared/constants'
import { ADMIN_AUTH_COOKIE_NAME } from '@/shared/constants/auth'

export async function GET(req: Request) {
   const url = new URL(req.url)
   const redirectUrl = new URL(ROUTES.public.signIn, url.origin)
   const response = NextResponse.redirect(redirectUrl)

   response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', {
      domain: '.mypixelgram.ru',
      path: '/',
      maxAge: 0,
      sameSite: 'none',
      secure: true,
   })

   return response
}

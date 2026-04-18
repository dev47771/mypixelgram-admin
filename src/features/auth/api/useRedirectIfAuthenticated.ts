'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constants'

type Options = {
   /** Куда отправить уже авторизованного пользователя */
   redirectTo?: string
}

/**
 * Для гостевых страниц (sign-in и т.п.): редирект, если сессия уже есть.
 * Учитывает bfcache (стрелка «назад»): повторная проверка по `pageshow` с `persisted`.
 */
export function useRedirectIfAuthenticated(options?: Options) {
   const { redirectTo = ROUTES.private.usersList } = options ?? {}
   const router = useRouter()

   useEffect(() => {
      let cancelled = false

      const redirectIfAuthenticated = async () => {
         try {
            const res = await fetch('/api/auth/session', { credentials: 'include' })
            if (!res.ok || cancelled) return
            const data = (await res.json()) as { authenticated?: boolean }
            if (data.authenticated) router.replace(redirectTo)
         } catch {
            /* ignore */
         }
      }

      void redirectIfAuthenticated()

      const onPageShow = (e: PageTransitionEvent) => {
         if (e.persisted) void redirectIfAuthenticated()
      }
      window.addEventListener('pageshow', onPageShow)
      return () => {
         cancelled = true
         window.removeEventListener('pageshow', onPageShow)
      }
   }, [router, redirectTo])
}

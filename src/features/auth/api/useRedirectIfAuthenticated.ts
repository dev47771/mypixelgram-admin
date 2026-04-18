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
      let mounted = true

      const redirectIfSessionExists = async () => {
         try {
            const res = await fetch('/api/auth/session', { credentials: 'include' })
            if (!mounted || !res.ok) return
            const { authenticated } = (await res.json()) as { authenticated?: boolean }
            if (authenticated) router.replace(redirectTo)
         } catch {
            // сеть / парсинг — остаёмся на странице
         }
      }

      void redirectIfSessionExists()

      const onPageShow = (e: PageTransitionEvent) => {
         if (e.persisted) void redirectIfSessionExists()
      }
      window.addEventListener('pageshow', onPageShow)
      return () => {
         mounted = false
         window.removeEventListener('pageshow', onPageShow)
      }
   }, [router, redirectTo])
}

'use client'

import { useEffect } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constants'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { AdminLoginInput, useLogin } from '@/features/auth/api'

type GraphQLError = {
   errors?: Array<{
      extensions?: {
         statusCode?: number
      }
   }>
}

export default function SignInPage() {
   const { login, loading, error } = useLogin()
   const router = useRouter()

   useEffect(() => {
      let cancelled = false

      const redirectIfAuthenticated = async () => {
         try {
            const res = await fetch('/api/auth/session', { credentials: 'include' })
            if (!res.ok || cancelled) return
            const data = (await res.json()) as { authenticated?: boolean }
            if (data.authenticated) router.replace(ROUTES.private.usersList)
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
   }, [router])

   const handleLogin = async (data: AdminLoginInput) => {
      await login(data.email, data.password)
      router.replace(ROUTES.private.usersList)
   }

   const statusCode = (error as GraphQLError)?.errors?.[0]?.extensions?.statusCode
   const formErrors =
      statusCode === 401 ? [{ field: 'password', message: 'Invalid email or password' }] : undefined

   return (
      <PageContainer className={'pt-6 pt-[108px]'}>
         <SignInForm onSubmitAction={handleLogin} errorsFromApi={formErrors} isLoading={loading} />
      </PageContainer>
   )
}

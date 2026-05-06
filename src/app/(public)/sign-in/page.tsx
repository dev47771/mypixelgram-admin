'use client'

import { useEffect } from 'react'
import { AdminLoginInput, useLogin } from '@/features/auth'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { ROUTES } from '@/shared/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { alert } from '@filippsm/ui-kit-mypixelgram-demo'

type GraphQLError = {
   errors?: Array<{
      extensions?: {
         code?: number
      }
   }>
}

export default function SignInPage() {
   const { login, loading, error } = useLogin()
   const router = useRouter()
   const searchParams = useSearchParams()
   const pathname = usePathname()

   useEffect(() => {
      if (searchParams.get('error') === 'server_error') {
         alert.error('Server error')

         const params = new URLSearchParams(searchParams.toString())
         params.delete('error')

         const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
         router.replace(nextUrl)
      }
   }, [searchParams, pathname, router])

   const handleLogin = async (data: AdminLoginInput) => {
      await login(data.email, data.password)
      router.replace(ROUTES.private.usersList)
   }

   const statusCode = (error as GraphQLError)?.errors?.[0]?.extensions?.code
   const formErrors =
      statusCode === 401 ? [{ field: 'password', message: 'Invalid email or password' }] : undefined

   return (
      <PageContainer className={'pt-6 pt-[108px]'}>
         <SignInForm onSubmitAction={handleLogin} errorsFromApi={formErrors} isLoading={loading} />
      </PageContainer>
   )
}

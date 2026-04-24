'use client'

import { AdminLoginInput, useLogin } from '@/features/auth'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { ROUTES } from '@/shared/constants'
import { useRouter } from 'next/navigation'

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

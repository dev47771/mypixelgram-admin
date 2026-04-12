'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constants'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { AdminLoginInput, useLogin } from '@/features/auth/api'

export default function SignInPage() {
   const { login, loading, error } = useLogin()
   const router = useRouter()

   const handleLogin = async (data: AdminLoginInput) => {
      const result = await login(data.email, data.password)
      if (result.data?.adminLogin?.accessToken) {
         router.push(ROUTES.private.usersList)
      }
   }

   return (
      <PageContainer className={'pt-6 pt-[108px]'}>
         <SignInForm
            onSubmitAction={handleLogin}
            errorsFromApi={
               error?.message === 'Unauthorized'
                  ? [{ field: 'password', message: 'Invalid email or password' }]
                  : undefined
            }
            isLoading={loading}
         />
      </PageContainer>
   )
}

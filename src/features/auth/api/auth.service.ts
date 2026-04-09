import { gql } from '@apollo/client'
import { AdminLoginInput, AdminLoginResponse } from './auth.types'
import { useMutation } from '@apollo/client/react'

const ADMIN_LOGIN = gql`
   mutation AdminLogin($input: AdminLoginInput!) {
      adminLogin(input: $input) {
         accessToken
      }
   }
`

export const useAdminLogin = () => {
   const [login, { data, loading, error }] = useMutation<
      AdminLoginResponse,
      { input: AdminLoginInput }
   >(ADMIN_LOGIN)

   const handleLogin = async (email: string, password: string) => {
      try {
         const result = await login({
            variables: {
               input: { email, password },
            },
         })

         const token = result.data?.adminLogin.accessToken
         if (token) {
            localStorage.setItem('accessToken', token)
         }

         return result
      } catch (err) {
         console.error('Login error:', err)
         throw err
      }
   }

   return { login: handleLogin, loading, error, data }
}

import { useMutation } from '@apollo/client/react'
import { ADMIN_LOGOUT } from './auth.operations'
import { AdminLogoutResponse } from './auth.types'

export const useLogout = () => {
   const [logout, { data, loading, error }] = useMutation<AdminLogoutResponse>(ADMIN_LOGOUT)

   const handleLogout = async () => {
      try {
         const result = await logout()

         return result
      } catch (err) {
         console.error('Logout error:', err)
         throw err
      }
   }

   return { logout: handleLogout, loading, error, data }
}

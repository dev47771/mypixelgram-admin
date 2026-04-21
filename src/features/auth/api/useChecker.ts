import { useQuery } from '@apollo/client/react'
import { ADMIN_CHECKER } from './auth.operations'
import { AdminCheckerResponse } from './auth.types'

export const useChecker = () => {
   const { data, loading, error, refetch } = useQuery<AdminCheckerResponse>(ADMIN_CHECKER)

   return { data, loading, error, refetch }
}

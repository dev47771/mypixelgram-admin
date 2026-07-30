import { useQuery } from '@apollo/client/react'
import { GET_USER_PAYMENTS } from './userProfile.operations'
import type { GetUserPaymentsQuery, GetUserPaymentsQueryVariables } from './userProfile.types'

export const useUserPayments = (login: string) => {
   return useQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GET_USER_PAYMENTS, {
      variables: {
         searchLoginTerm: login,
      },
      skip: !login,
      notifyOnNetworkStatusChange: true,
   })
}

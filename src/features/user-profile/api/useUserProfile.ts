import { useQuery } from '@apollo/client/react'
import { GET_USER_PROFILE } from './userProfile.operations'
import type { GetUserProfileQuery, GetUserProfileQueryVariables } from './userProfile.types'

export const useUserProfile = (login: string) => {
   return useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GET_USER_PROFILE, {
      variables: { searchLoginTerm: login },
      skip: !login,
      notifyOnNetworkStatusChange: true,
   })
}

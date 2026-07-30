import { useQuery } from '@apollo/client/react'
import { GET_POSTS_LIST } from './userProfile.operations'
import type { GetPostsListQuery, GetPostsListQueryVariables } from './userProfile.types'

export const usePostsList = (login: string) => {
   return useQuery<GetPostsListQuery, GetPostsListQueryVariables>(GET_POSTS_LIST, {
      variables: {
         searchLoginTerm: login,
      },
      skip: !login,
      notifyOnNetworkStatusChange: true,
   })
}

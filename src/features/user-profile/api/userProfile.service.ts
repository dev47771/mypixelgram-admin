import { gql, type TypedDocumentNode } from '@apollo/client'

type GetUserProfileQuery = {
   getUsers: {
      users: {
         login: string
         createdAt: string
         profile: {
            firstName: string
            lastName: string
            avatarUrl: string
         } | null
      }[]
   }
}

type GetUserProfileQueryVariables = {
   userId: string
}

export const GET_USER_PROFILE: TypedDocumentNode<
   GetUserProfileQuery,
   GetUserProfileQueryVariables
> = gql`
   query GetUserProfile($userId: String!) {
      getUsers(userId: $userId) {
         users {
            id
            login
            createdAt
            profile {
               firstName
               lastName
               avatarUrl
            }
         }
      }
   }
`

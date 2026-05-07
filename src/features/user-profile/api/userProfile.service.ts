import { gql, type TypedDocumentNode } from '@apollo/client'

type GetUserProfileQuery = {
   getUsers: {
      users: {
         id: string
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
   searchLoginTerm: string
}

export const GET_USER_PROFILE: TypedDocumentNode<
   GetUserProfileQuery,
   GetUserProfileQueryVariables
> = gql`
   query GetUserProfile($searchLoginTerm: String!) {
      getUsers(searchLoginTerm: $searchLoginTerm) {
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

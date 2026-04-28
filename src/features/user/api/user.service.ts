import { gql, type TypedDocumentNode } from '@apollo/client'

type GetUsersListQuery = {
   getUsers: {
      users: {
         id: string
         login: string
         createdAt: string
      }[]
      pageInfo: {
         pageNumber: number
         pageSize: number
         totalPages: number
         totalItems: number
      }
   }
}

type GetUsersListQueryVariables = {
   pageNumber?: number
   pageSize?: number
}

// type GetUsersListQueryVariables = Record<string, never> //для запроса без переменных

export const GET_USERS_LIST: TypedDocumentNode<GetUsersListQuery, GetUsersListQueryVariables> = gql`
   query GetUsersList($pageNumber: Float, $pageSize: Float) {
      getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {
         users {
            id
            login
            createdAt
         }
         pageInfo {
            pageNumber
            pageSize
            totalPages
            totalItems
         }
      }
   }
`

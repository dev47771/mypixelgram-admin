import { gql } from '@apollo/client'

export const GET_USER_PROFILE = gql`
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

export const GET_USER_PAYMENTS = gql`
   query GetUserPayments($searchLoginTerm: String!) {
      getUsers(searchLoginTerm: $searchLoginTerm) {
         pageInfo {
            pageNumber
            pageSize
            totalPages
            totalItems
         }
         users {
            id
            login
            email
            createdAt
            payments {
               id
               amount
               paymentDate
               subscriptionType
               paymentType
            }
         }
      }
   }
`

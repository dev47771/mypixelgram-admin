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
   query GetUserPayments($searchLoginTerm: String!, $pageNumber: Float!, $pageSize: Float!) {
      getUsers(searchLoginTerm: $searchLoginTerm, pageNumber: $pageNumber, pageSize: $pageSize) {
         payments {
            amount
            paymentDate
            subscriptionType
            paymentType
         }
         paymentsPagination {
            pageNumber
            pageSize
            totalPages
            totalItems
         }
      }
   }
`

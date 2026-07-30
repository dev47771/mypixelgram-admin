import { gql, type TypedDocumentNode } from '@apollo/client'

type GetPaymentsListQuery = {
   getPaymentsList: {
      payments: {
         userId: string
         username: string
         avatarUrl: string | null
         paymentDate: string
         amount: string
         subscriptionType: string
         paymentType: string
      }[]
      pageInfo: {
         pageNumber: number
         pageSize: number
         totalPages: number
         totalItems: number
      }
   }
}

type GetPaymentsListQueryVariables = {
   pageNumber: number
   pageSize: number
   searchLoginTerm?: string
}

export const GET_PAYMENTS_LIST: TypedDocumentNode<
   GetPaymentsListQuery,
   GetPaymentsListQueryVariables
> = gql`
   query GetPaymentsList($pageNumber: Int!, $pageSize: Int!, $searchLoginTerm: String) {
      getPaymentsList(
         pageNumber: $pageNumber
         pageSize: $pageSize
         searchLoginTerm: $searchLoginTerm
      ) {
         payments {
            userId
            username
            avatarUrl
            paymentDate
            amount
            subscriptionType
            paymentType
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

export type PaymentsListItem = GetPaymentsListQuery['getPaymentsList']['payments'][number]

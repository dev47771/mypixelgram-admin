import { gql, type TypedDocumentNode } from '@apollo/client'

type GetPaymentsListQuery = {
   getUsers: {
      payments: {
         id: string
         paymentDate: string
         amount: number
         subscriptionType: string
         paymentType: string
      }[]
      paymentsPagination: {
         pageNumber: number
         pageSize: number
         totalPages: number
         totalItems: number
      }
   }
}

type GetPaymentsListQueryVariables = {
   pageNumber?: number
   pageSize?: number
   searchLoginTerm?: string
}

export const GET_PAYMENTS_LIST: TypedDocumentNode<
   GetPaymentsListQuery,
   GetPaymentsListQueryVariables
> = gql`
   query GetPaymentsList($pageNumber: Float, $pageSize: Float, $searchLoginTerm: String) {
      getUsers(pageNumber: $pageNumber, pageSize: $pageSize, searchLoginTerm: $searchLoginTerm) {
         payments {
            id
            paymentDate
            amount
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

export type PaymentsListItem = GetPaymentsListQuery['getUsers']['payments'][number]

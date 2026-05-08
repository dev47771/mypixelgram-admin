export type GetUserProfileQuery = {
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

export type GetUserProfileQueryVariables = {
   searchLoginTerm: string
}

export type UserPayment = {
   amount: number
   paymentDate: string
   subscriptionType: string
   paymentType: string
}

export type PaymentsPagination = {
   pageNumber: number
   pageSize: number
   totalPages: number
   totalItems: number
}

export type GetUserPaymentsQuery = {
   getUsers: {
      payments: UserPayment[]
      paymentsPagination: PaymentsPagination
   }
}

export type GetUserPaymentsQueryVariables = {
   searchLoginTerm: string
   pageNumber: number
   pageSize: number
}

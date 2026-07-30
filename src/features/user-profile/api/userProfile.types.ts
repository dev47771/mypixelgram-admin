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
   id: string
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
      pageInfo: PaymentsPagination
      users: {
         id: string
         login: string
         email: string
         createdAt: string
         payments: UserPayment[]
      }[]
   }
}

export type GetUserPaymentsQueryVariables = {
   searchLoginTerm: string
}

export type PostPublication = {
   userId: string
   username: string
   postId: string
   firstFileUrl: string | null
}

export type PostsPageInfo = {
   nextCursor: string | null
   hasMore: boolean
}

export type GetPostsListQuery = {
   getPostsList: {
      publications: PostPublication[]
      pageInfo: PostsPageInfo
   }
}

export type GetPostsListQueryVariables = {
   searchLoginTerm: string
}

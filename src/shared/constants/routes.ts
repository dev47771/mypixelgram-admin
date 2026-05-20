export const ROUTES = {
   public: {
      signIn: '/sign-in',
   },

   private: {
      usersList: '/users-list',
      statistics: '/statistics',
      paymentsList: '/payments-list',
      postsList: '/posts-list',
   },
} as const

export const API_ROUTES = {
   auth: {
      sessionExpired: '/api/auth/session-expired',
   },
} as const

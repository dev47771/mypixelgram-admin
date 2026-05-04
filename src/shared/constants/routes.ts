import { ProfileTabType } from '@/features/user-profile'

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
   informations: {
      base: '/profile',
      create: (part: ProfileTabType) => `/profile?part=${part}`,
   },
} as const

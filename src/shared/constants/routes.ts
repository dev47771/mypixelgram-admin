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
      create: (part: ProfileTabType, login?: string) =>
         login !== undefined && login !== ''
            ? `/profile/${encodeURIComponent(login)}?part=${part}`
            : `/profile?part=${part}`,
   },
} as const

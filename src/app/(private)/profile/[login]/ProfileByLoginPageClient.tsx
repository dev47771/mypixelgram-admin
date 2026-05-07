import { GET_USER_PROFILE } from '@/features/user-profile'
import { ROUTES } from '@/shared/constants'
import { client } from '@/shared/api'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { TabsBlock } from '@/widgets/TabsBlock'
import { ArrowBackIcon, Avatar } from '@filippsm/ui-kit-mypixelgram-demo'
import Link from 'next/link'

type PageProps = {
   login: string
   initialPart: string
}

const ProfileByLoginPageClient = async ({ login, initialPart }: PageProps) => {
   const { data } = await client.query({
      query: GET_USER_PROFILE,
      variables: { searchLoginTerm: login },
   })

   const apiUser = data?.getUsers.users[0]
   const profile = apiUser?.profile

   const displayName =
      [profile?.firstName, profile?.lastName].filter(Boolean).join(' ').trim() || login
   const avatar = profile?.avatarUrl ? profile.avatarUrl : null
   const userId = apiUser?.id ?? ''
   const profileCreationDate = dateFormatter.serverToForm(apiUser?.createdAt)

   return (
      <>
         <Link
            href={ROUTES.private.usersList}
            className="font-regular text-s leading-m text-light-100 flex shrink-0 items-center gap-3 self-start"
         >
            <ArrowBackIcon />
            Back to Users List
         </Link>

         <div className="mt-6 flex shrink-0 items-center gap-6">
            <Avatar size="md" src={avatar} alt="user avatar" />
            <div className="flex min-w-0 flex-col gap-1">
               <p className="text-xxl leading-l font-bold">{displayName}</p>
               <span className="font-regular text-m leading-m text-light-100 underline">
                  {login}
               </span>
            </div>
         </div>

         <div className="mt-6 flex flex-wrap gap-x-24 gap-y-6">
            <div className="flex min-w-0 flex-col gap-1">
               <span className="font-regular text-s leading-m text-light-900">UserID</span>
               <span className="font-regular text-m leading-m text-light-100">{userId}</span>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
               <span className="font-regular text-s leading-m text-light-900">
                  Profile Creation Date
               </span>
               <span className="font-regular text-m leading-m text-light-100">
                  {profileCreationDate}
               </span>
            </div>
         </div>
         <TabsBlock initialPart={initialPart} profileLogin={login} />
      </>
   )
}

export default ProfileByLoginPageClient

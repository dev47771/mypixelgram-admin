import { ROUTES } from '@/shared/constants'
import { TabsBlock } from '@/widgets/TabsBlock'
import { ArrowBackIcon, Avatar } from '@filippsm/ui-kit-mypixelgram-demo'
import Link from 'next/link'

const user = {
   avatar: null,
   name: 'Ivan Yakimenko',
   link: 'Ivan.sr.yakimenko',
   userId: '21331QErQe21',
   profileCreationDate: '12.12.2022',
}

type PageProps = {
   searchParams: Promise<{ part?: string }>
}

const Page = async ({ searchParams }: PageProps) => {
   const { part } = await searchParams
   const initialPart = part ?? 'uploaded-files'

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
            <Avatar size="md" src={user.avatar} alt="user avatar" />
            <div className="flex min-w-0 flex-col gap-1">
               <p className="text-xxl leading-l font-bold">{user.name}</p>
               <span className="font-regular text-m leading-m text-light-100 underline">
                  {user.link}
               </span>
            </div>
         </div>

         <div className="mt-6 flex flex-wrap gap-x-24 gap-y-6">
            <div className="flex min-w-0 flex-col gap-1">
               <span className="font-regular text-s leading-m text-light-900">UserID</span>
               <span className="font-regular text-m leading-m text-light-100">{user.userId}</span>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
               <span className="font-regular text-s leading-m text-light-900">
                  Profile Creation Date
               </span>
               <span className="font-regular text-m leading-m text-light-100">
                  {user.profileCreationDate}
               </span>
            </div>
         </div>
         <TabsBlock initialPart={initialPart} />
      </>
   )
}

export default Page

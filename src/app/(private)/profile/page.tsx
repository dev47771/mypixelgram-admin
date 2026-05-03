import { ROUTES } from '@/shared/constants'
import { ArrowBackIcon, Avatar } from '@filippsm/ui-kit-mypixelgram-demo'
import Link from 'next/link'

const user = {
   avatar: null,
}

const Page = () => {
   return (
      <>
         <Link
            href={ROUTES.private.usersList}
            className="font-regular text-s leading-m flex gap-3 self-start"
         >
            <ArrowBackIcon />
            Back to Users List
         </Link>
         <div>
            <Avatar size="md" src={user.avatar} alt="user avatar" />
         </div>
         <div>profile</div>
      </>
   )
}

export default Page

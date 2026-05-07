'use client'

import { ROUTES } from '@/shared/constants'
import { USER_MENU_ITEMS } from '@/widgets/UsersTable/config'
import {
   DropDownMenu,
   DropDownMenuItem,
   DropDownMenuTrigger,
   MoreIcon,
   Typography,
} from '@filippsm/ui-kit-mypixelgram-demo'
import { useRouter } from 'next/navigation'

export const UserActionsMenu = () => {
   const router = useRouter()

   const handleSelect = (action: string) => {
      if (action === 'more') {
         router.push(ROUTES.informations.base)
      }
   }

   return (
      <DropDownMenu
         trigger={
            <DropDownMenuTrigger className={'data-[state=open]:text-accent-500 ml-auto'}>
               <MoreIcon />
            </DropDownMenuTrigger>
         }
      >
         {USER_MENU_ITEMS.map(({ icon: Icon, value, action }) => (
            <DropDownMenuItem
               key={value}
               className="flex items-center gap-3 p-3"
               onSelect={() => handleSelect(action)}
            >
               <Icon />
               <Typography variant="captionRegular" as="span">
                  {value}
               </Typography>
            </DropDownMenuItem>
         ))}
      </DropDownMenu>
   )
}

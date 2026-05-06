import { USER_MENU_ITEMS } from '@/widgets/UsersTable/config'
import {
   DropDownMenu,
   DropDownMenuItem,
   DropDownMenuTrigger,
   MoreIcon,
   Typography,
} from '@filippsm/ui-kit-mypixelgram-demo'

export const UserActionsMenu = () => {
   return (
      <DropDownMenu
         trigger={
            <DropDownMenuTrigger className={'data-[state=open]:text-accent-500 ml-auto'}>
               <MoreIcon />
            </DropDownMenuTrigger>
         }
      >
         {USER_MENU_ITEMS.map(({ icon: Icon, value }) => (
            <DropDownMenuItem
               key={value}
               className="flex items-center gap-3 p-3"
               onSelect={() => {}}
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

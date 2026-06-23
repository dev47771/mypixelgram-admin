import {
   DropDownMenu,
   DropDownMenuItem,
   DropDownMenuTrigger,
   MoreIcon,
   Typography,
   UnfollowIcon,
} from '@filippsm/ui-kit-mypixelgram-demo'
import { BanIcon } from '@/shared/icons'
import { ConfirmModal } from '@/shared/modals'
import { useState } from 'react'
import { useDeleteUser } from '@/features/admin'
import { UserType } from '@/entities/user/model'

type Props = {
   user: UserType
}

export const UserActionsMenu = ({ user: { id, login } }: Props) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const { deleteUser } = useDeleteUser()

   const handleConfirmDeleteUserAccount = async () => {
      await deleteUser(id)
      setIsDeleteModalOpen(false)
   }

   return (
      <>
         <DropDownMenu
            trigger={
               <DropDownMenuTrigger className={'data-[state=open]:text-accent-500 ml-auto'}>
                  <MoreIcon />
               </DropDownMenuTrigger>
            }
         >
            <DropDownMenuItem
               key={'Delete User'}
               className="flex items-center gap-3 p-3"
               onSelect={() => setIsDeleteModalOpen(true)}
            >
               <UnfollowIcon />
               <Typography variant="captionRegular" as="span">
                  Delete User
               </Typography>
            </DropDownMenuItem>
            <DropDownMenuItem
               key={'Ban in the system'}
               className="flex items-center gap-3 p-3"
               onSelect={() => {}}
            >
               <BanIcon />
               <Typography variant="captionRegular" as="span">
                  Ban in the system
               </Typography>
            </DropDownMenuItem>
            <DropDownMenuItem
               key={'More Information'}
               className="flex items-center gap-3 p-3"
               onSelect={() => {}}
            >
               <MoreIcon />
               <Typography variant="captionRegular" as="span">
                  More Information
               </Typography>
            </DropDownMenuItem>
         </DropDownMenu>
         <ConfirmModal
            open={isDeleteModalOpen}
            title="Delete user"
            description={`Are you really want to delete ${login} account ?`}
            onConfirm={handleConfirmDeleteUserAccount}
            onCancel={() => setIsDeleteModalOpen(false)}
         />
      </>
   )
}

'use client'

import { cn } from '@/shared/lib'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithRef, ElementType, useState } from 'react'

import {
   LogoutIcon,
   PaymentIcon,
   PaymentOutlineIcon,
   PersonIcon,
   PersonOutlineIcon,
   PostIcon,
   PostOutlineIcon,
   StatisticIcon,
} from '@filippsm/ui-kit-mypixelgram-demo'
import { ROUTES } from '@/shared/constants'
import { ConfirmModal } from '@/shared/modals'

type SidebarItemType = {
   id: string
   name: string
   path?: string
   icon?: ElementType
   activeIcon?: ElementType
   disabled?: boolean
   onClick?: () => void
   className?: string
}

type Props = {
   items?: SidebarItemType[]
} & ComponentPropsWithRef<'nav'>

export type SidebarItemProps = SidebarItemType & ComponentPropsWithRef<'li'>

export const Sidebar = ({ className, ...rest }: Props) => {
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

   const handleLogoutClick = () => setIsLogoutModalOpen(true)

   const handleConfirmLogout = async () => {
      setIsLogoutModalOpen(false)
   }

   return (
      <aside>
         <nav
            {...rest}
            className={cn('border-dark-300 fixed top-0 w-full max-w-[162px] border-r', className)}
         >
            <ul className={cn('flex h-screen flex-col pt-[132px]')}>
               <SidebarItem
                  id="1"
                  name="Users list"
                  icon={PersonOutlineIcon}
                  activeIcon={PersonIcon}
                  path={ROUTES.private.usersList}
               />
               <SidebarItem
                  id="2"
                  name="Statistics"
                  icon={StatisticIcon}
                  activeIcon={StatisticIcon}
                  path={ROUTES.private.statistics}
               />
               <SidebarItem
                  id="3"
                  name="Payments list"
                  icon={PaymentOutlineIcon}
                  activeIcon={PaymentIcon}
                  path={ROUTES.private.paymentsList}
               />
               <SidebarItem
                  id="4"
                  name="Posts list"
                  icon={PostOutlineIcon}
                  activeIcon={PostIcon}
                  path={ROUTES.private.postsList}
               />
               <SidebarItem id="5" name="Log Out" icon={LogoutIcon} onClick={handleLogoutClick} />
            </ul>
         </nav>

         <ConfirmModal
            open={isLogoutModalOpen}
            title="Log Out"
            description="Are you really want to log out of your account?"
            onConfirm={handleConfirmLogout}
            onCancel={() => setIsLogoutModalOpen(false)}
         />
      </aside>
   )
}

const SidebarItem = ({
   path,
   icon: Icon,
   activeIcon: ActiveIcon,
   disabled,
   name,
   onClick,
   className,
   ...rest
}: SidebarItemProps) => {
   const currentPath = usePathname()
   const IconToRender = currentPath === path && ActiveIcon ? ActiveIcon : Icon

   const content = (
      <>
         {IconToRender && <IconToRender />}
         {name}
      </>
   )

   const classesForItem = cn(
      'text-light-100 text-sm flex items-center gap-3 rounded-xs font-medium outline-none transition-colors duration-200 cursor-pointer',
      'focus-visible:ring-accent-700 hover:text-accent-100 active:text-accent-500 focus-visible:ring-2',
      {
         'text-dark-100 pointer-events-none': disabled,
         'text-accent-500': currentPath === path,
      }
   )

   return (
      <>
         <li {...rest} className={cn('mb-6 last:mb-9', className)}>
            {onClick ? (
               <button disabled={disabled} onClick={onClick} className={classesForItem}>
                  {content}
               </button>
            ) : (
               <Link href={path as string} className={classesForItem}>
                  {content}
               </Link>
            )}
         </li>
      </>
   )
}

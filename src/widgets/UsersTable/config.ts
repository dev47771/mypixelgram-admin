import { BanIcon } from '@/shared/icons'
import { MoreIcon, UnfollowIcon } from '@filippsm/ui-kit-mypixelgram-demo'

export const USER_MENU_ITEMS = [
   { icon: UnfollowIcon, value: 'Delete User', action: 'delete' },
   { icon: BanIcon, value: 'Ban in the system', action: 'ban' },
   { icon: MoreIcon, value: 'More Information', action: 'more' },
]

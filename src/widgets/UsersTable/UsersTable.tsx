import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeadCell,
   TableRow,
} from '@filippsm/ui-kit-mypixelgram-demo'
import type { User } from '@/entities/user/model'
import { dateFormatter } from '@/shared/utils'
import { UserActionsMenu } from './UserActionsMenu'
import Link from 'next/link'
import { SortIcon } from '@/shared/icons'
import { cn } from '@/shared/lib'

type Props = {
   users?: User[]
   onSortByDate: () => void
   onSortByLogin: () => void
}

const paddingClass = 'py-2 px-6'

export const UsersTable = ({ users = [], onSortByDate, onSortByLogin }: Props) => {
   return (
      <Table className="mt-6 mb-9 table-fixed">
         {/*<colgroup>*/}
         {/*   <col style={{ width: '220px' }} /> /!* User ID *!/*/}
         {/*   <col style={{ width: '220px' }} /> /!* Profile link *!/*/}
         {/*   <col style={{ width: '200px' }} /> /!* Username *!/*/}
         {/*   <col style={{ width: '180px' }} /> /!* Date *!/*/}
         {/*   <col style={{ width: '80px' }} /> /!* actions *!/*/}
         {/*</colgroup>*/}

         <TableHead>
            <TableRow>
               <TableHeadCell className={paddingClass}>User ID</TableHeadCell>
               <TableHeadCell className={cn(paddingClass, 'flex items-center gap-1.5')}>
                  Profile link
                  <SortIcon onClick={onSortByLogin} />
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>Username</TableHeadCell>
               <TableHeadCell className={cn(paddingClass, 'flex items-center gap-1.5')}>
                  Date added <SortIcon onClick={onSortByDate} />
               </TableHeadCell>
               <TableHeadCell className={paddingClass}></TableHeadCell>
            </TableRow>
         </TableHead>

         <TableBody>
            {users.map(user => (
               <TableRow key={user.id}>
                  <TableCell className={paddingClass}>{user.id}</TableCell>
                  <TableCell className={paddingClass}>
                     <Link href={`/profile/${user.login}`} target={'_blank'}>
                        {user.login}
                     </Link>
                  </TableCell>
                  <TableCell className={paddingClass}>{user.login}</TableCell>
                  <TableCell className={paddingClass}>
                     {dateFormatter.serverToForm(user.createdAt)}
                  </TableCell>
                  <TableCell className={paddingClass}>
                     <div className="flex justify-end">
                        <UserActionsMenu />
                     </div>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

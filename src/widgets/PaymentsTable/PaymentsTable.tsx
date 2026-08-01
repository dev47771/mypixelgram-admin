import {
   Avatar,
   FilterIcon,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeadCell,
   TableRow,
} from '@filippsm/ui-kit-mypixelgram-demo'
import type { PaymentsListItem } from '@/features/payments/api'
import { dateFormatter } from '@/shared/utils'

type Props = {
   payments?: PaymentsListItem[]
}

const paddingClass = 'py-2 px-6'

export const PaymentsTable = ({ payments = [] }: Props) => {
   return (
      <Table className="mt-6 mb-9 table-fixed">
         <TableHead>
            <TableRow>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Full Name
                     <FilterIcon className="cursor-pointer" />
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Date of Payment
                     <FilterIcon className="cursor-pointer" />
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Amount
                     <FilterIcon className="cursor-pointer" />
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>Subscription</TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Payment Method
                     <FilterIcon className="cursor-pointer" />
                  </div>
               </TableHeadCell>
            </TableRow>
         </TableHead>

         <TableBody>
            {payments.map((payment, index) => (
               <TableRow key={`${payment.userId}-${payment.paymentDate}-${index}`}>
                  <TableCell className={paddingClass}>
                     <div className="flex items-center gap-3">
                        <Avatar src={payment.avatarUrl} alt={payment.username} size="md" />
                        <span>{payment.username}</span>
                     </div>
                  </TableCell>
                  <TableCell className={paddingClass}>
                     {dateFormatter.serverToForm(payment.paymentDate)}
                  </TableCell>
                  <TableCell className={paddingClass}>{payment.amount}</TableCell>
                  <TableCell className={paddingClass}>{payment.subscriptionType}</TableCell>
                  <TableCell className={paddingClass}>{payment.paymentType}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

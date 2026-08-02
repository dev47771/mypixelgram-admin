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
import type { PaymentsListItem, PaymentsSortField } from '@/features/payments/api'
import { dateFormatter } from '@/shared/utils'

type Props = {
   payments?: PaymentsListItem[]
   onSort: (field: PaymentsSortField) => void
}

const paddingClass = 'py-2 px-6'

export const PaymentsTable = ({ payments = [], onSort }: Props) => {
   return (
      <Table className="mt-6 mb-9 table-fixed">
         <TableHead>
            <TableRow>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Full Name
                     <button
                        type="button"
                        onClick={() => onSort('USERNAME')}
                        className="cursor-pointer"
                        aria-label="Sort by username"
                     >
                        <FilterIcon />
                     </button>
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Date of Payment
                     <button
                        type="button"
                        onClick={() => onSort('DATE')}
                        className="cursor-pointer"
                        aria-label="Sort by payment date"
                     >
                        <FilterIcon />
                     </button>
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Amount
                     <button
                        type="button"
                        onClick={() => onSort('AMOUNT')}
                        className="cursor-pointer"
                        aria-label="Sort by amount"
                     >
                        <FilterIcon />
                     </button>
                  </div>
               </TableHeadCell>
               <TableHeadCell className={paddingClass}>Subscription</TableHeadCell>
               <TableHeadCell className={paddingClass}>
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                     Payment Method
                     <button
                        type="button"
                        onClick={() => onSort('PAYMENT_METHOD')}
                        className="cursor-pointer"
                        aria-label="Sort by payment method"
                     >
                        <FilterIcon />
                     </button>
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

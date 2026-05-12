import {
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
               <TableHeadCell className={paddingClass}>Date of Payment</TableHeadCell>
               <TableHeadCell className={paddingClass}>Amount</TableHeadCell>
               <TableHeadCell className={paddingClass}>Subscription</TableHeadCell>
               <TableHeadCell className={paddingClass}>Payment Method</TableHeadCell>
            </TableRow>
         </TableHead>

         <TableBody>
            {payments.map(payment => (
               <TableRow key={payment.id}>
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

'use client'

import { useUserPayments } from '../../api/useUserPayments'
import {
   PAGE_SIZE_OPTIONS,
   type PageSize,
   START_CURRENT_PAGE,
   START_PAGE_SIZE,
} from '../../constans/pageSizeOptions'
import {
   Button,
   Loader,
   Pagination,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeadCell,
   TableRow,
} from '@filippsm/ui-kit-mypixelgram-demo'
import { useState } from 'react'

type PaymentsTabPageProps = {
   profileLogin: string
}

export const PaymentsTabPage = ({ profileLogin }: PaymentsTabPageProps) => {
   const [currentPage, setCurrentPage] = useState(START_CURRENT_PAGE)
   const [pageSize, setPageSize] = useState<PageSize>(START_PAGE_SIZE)

   const { data, loading, error, refetch } = useUserPayments(profileLogin)

   if (loading) return <Loader />
   if (error) {
      return (
         <div className="bg-dark-500 border-dark-300 mx-auto w-fit border p-4">
            Failed to payments. Please try again later.
            <Button onClick={() => refetch()} className="ml-8">
               Try again
            </Button>
         </div>
      )
   }

   const allPayments = data?.getUsers.users[0]?.payments ?? []
   const totalCount = allPayments.length
   const startIndex = (currentPage - 1) * Number(pageSize)
   const payments = allPayments.slice(startIndex, startIndex + Number(pageSize))

   const paddingClass = 'py-2'

   return (
      <div className="flex flex-col gap-4">
         <Table className="table-fixed">
            <TableHead>
               <TableRow>
                  <TableHeadCell className={paddingClass}>Date of Payment</TableHeadCell>
                  <TableHeadCell className={paddingClass}>End date of subscription</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Amount, $</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Subscription Type</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Payment Type</TableHeadCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {payments.length > 0 ? (
                  payments.map(payment => (
                     <TableRow key={payment.id}>
                        <TableCell className={paddingClass}>{payment.paymentDate}</TableCell>
                        <TableCell className={paddingClass}>—</TableCell>
                        <TableCell className={paddingClass}>{payment.amount}</TableCell>
                        <TableCell className={paddingClass}>{payment.subscriptionType}</TableCell>
                        <TableCell className={paddingClass}>{payment.paymentType}</TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={5} className="py-8 text-center">
                        No payments yet
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <Pagination
            currentPage={currentPage}
            onChangePage={setCurrentPage}
            onPageSizeChange={value => {
               setPageSize(Number(value) as PageSize)
               setCurrentPage(1)
            }}
            selectOptions={PAGE_SIZE_OPTIONS}
            pageSize={Number(pageSize)}
            totalCount={totalCount}
         />
      </div>
   )
}

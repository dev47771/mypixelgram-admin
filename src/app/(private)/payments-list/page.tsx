'use client'

import { SearchInput } from '@/shared/components/SearchInput'
import { Button, Loader, Pagination, Typography } from '@filippsm/ui-kit-mypixelgram-demo'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { PAGE_SIZE_OPTIONS, type PageSize, START_CURRENT_PAGE, START_PAGE_SIZE } from './pagination'
import { NetworkStatus } from '@apollo/client'
import { GET_PAYMENTS_LIST } from '@/features/payments/api'
import { PaymentsTable } from '@/widgets/PaymentsTable'

const Page = () => {
   const [currentPage, setCurrentPage] = useState(START_CURRENT_PAGE)
   const [pageSize, setPageSize] = useState<PageSize>(START_PAGE_SIZE)
   const [searchValue, setSearchValue] = useState<string>('')

   const { loading, data, refetch, error, networkStatus } = useQuery(GET_PAYMENTS_LIST, {
      variables: { pageSize, pageNumber: currentPage, searchLoginTerm: searchValue },
      notifyOnNetworkStatusChange: true,
   })

   const payments = data?.getUsers.payments ?? []
   const totalCount = data?.getUsers.paymentsPagination.totalItems ?? 0

   const isInitialLoading = loading && networkStatus === NetworkStatus.loading && !data
   const isUpdatingPayments =
      networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch

   if (isInitialLoading) {
      return <Loader />
   }

   if (error)
      return (
         <div className={'flex flex-col items-center'}>
            <Typography variant={'h1'} className={'my-6'}>
               Something went wrong
            </Typography>
            <Button onClick={() => refetch()}>Try again</Button>
         </div>
      )

   return (
      <>
         <div className={'flex items-center gap-6 self-stretch'}>
            <SearchInput
               onSearch={value => {
                  setSearchValue(value)
                  setCurrentPage(1)
               }}
               className={'max-w-[644px] flex-1'}
            />
         </div>

         <div className="relative">
            {isUpdatingPayments && <Loader />}

            {payments.length === 0 && !isUpdatingPayments ? (
               <Typography variant="h1" className="my-6">
                  Payments not found
               </Typography>
            ) : (
               <PaymentsTable payments={payments} />
            )}

            {totalCount > 0 && (
               <Pagination
                  currentPage={currentPage}
                  onChangePage={setCurrentPage}
                  onPageSizeChange={value => {
                     setPageSize(Number(value) as PageSize)
                     setCurrentPage(1)
                  }}
                  pageSize={pageSize}
                  selectOptions={PAGE_SIZE_OPTIONS}
                  totalCount={totalCount}
               />
            )}
         </div>
      </>
   )
}

export default Page

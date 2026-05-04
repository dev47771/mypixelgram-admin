'use client'
import { SearchInput } from '@/shared/components/SearchInput'
import {
   Button,
   Loader,
   Pagination,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
   Typography,
} from '@filippsm/ui-kit-mypixelgram-demo'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { PAGE_SIZE_OPTIONS, type PageSize, START_CURRENT_PAGE, START_PAGE_SIZE } from './pagination'
import { NetworkStatus } from '@apollo/client'
import { UsersTable } from '@/widgets/UsersTable'
import { GET_USERS_LIST, type SortDirection, type SortField } from '@/features/user/api'

const Page = () => {
   const [currentPage, setCurrentPage] = useState(START_CURRENT_PAGE)
   const [pageSize, setPageSize] = useState<PageSize>(START_PAGE_SIZE)
   const [selectValue, setSelectValue] = useState<string>('')

   const [sortBy, setSortBy] = useState<SortField>('CREATED_AT')
   const [sortDirection, setSortDirection] = useState<SortDirection>('DESC')

   const { loading, data, refetch, error, networkStatus } = useQuery(GET_USERS_LIST, {
      variables: {
         pageSize,
         pageNumber: currentPage,
         sortBy,
         sortDirection,
      },
      notifyOnNetworkStatusChange: true,
   })

   const users = data?.getUsers.users ?? []
   const totalCount = data?.getUsers.pageInfo.totalItems ?? 0

   const isInitialLoading = loading && networkStatus === NetworkStatus.loading && !data
   const isUpdatingUsers =
      networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch

   if (isInitialLoading) {
      return <Loader />
   }

   const onSortHandler = (field: SortField) => {
      setCurrentPage(1)
      setSortBy(field)
      setSortDirection(prev => (prev === 'ASC' ? 'DESC' : 'ASC'))
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
            <SearchInput onSearch={() => {}} className={'max-w-[644px] flex-1'} />
            <Select value={selectValue} onValueChange={setSelectValue}>
               <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Not selected" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="not-blocked">Not Blocked</SelectItem>
               </SelectContent>
            </Select>
         </div>

         <div className="relative">
            {isUpdatingUsers && <Loader />}

            {users.length === 0 && !isUpdatingUsers ? (
               <Typography variant="h1" className="my-6">
                  Users not found
               </Typography>
            ) : (
               <UsersTable
                  users={users}
                  onSortByDate={() => onSortHandler('CREATED_AT')}
                  onSortByLogin={() => onSortHandler('LOGIN')}
               />
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

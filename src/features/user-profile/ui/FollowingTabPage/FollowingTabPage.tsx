'use client'

/* eslint-disable */
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

type FollowingTabPageProps = {
   profileLogin: string
}

export const FollowingTabPage = ({ profileLogin }: FollowingTabPageProps) => {
   const [currentPage, setCurrentPage] = useState(START_CURRENT_PAGE)
   const [pageSize, setPageSize] = useState<PageSize>(START_PAGE_SIZE)

   /* const { data, loading, error, refetch } = useUserPayments(
      profileLogin,
      currentPage,
      Number(pageSize)
   )

   if (loading) return <Loader />
   if (error) {
      return (
         <div className="bg-dark-500 border-dark-300 mx-auto w-fit border p-4">
            Failed to followers. Please try again later.
            <Button onClick={() => refetch()} className="ml-8">
               Try again
            </Button>
         </div>
      )
   } */

   const MOCK_FOLLOWING = [
      {
         id: '1',
         login: 'alice_pixel',
         firstName: 'Алиса',
         lastName: 'Иванова',
         subscriptionDate: '2025-12-01',
      },
      {
         id: '2',
         login: 'bob_shots',
         firstName: 'Боб',
         lastName: 'Смирнов',
         subscriptionDate: '2026-01-15',
      },
      {
         id: '3',
         login: 'carol_frames',
         firstName: 'Кэрол',
         lastName: 'Ким',
         subscriptionDate: '2026-02-20',
      },
      {
         id: '4',
         login: 'bob_shots',
         firstName: 'Боб',
         lastName: 'Смирнов',
         subscriptionDate: '2026-01-15',
      },
      {
         id: '5',
         login: 'carol_frames',
         firstName: 'Кэрол',
         lastName: 'Ким',
         subscriptionDate: '2026-02-20',
      },
   ] as const
   const MOCK_TOTAL_COUNT = MOCK_FOLLOWING.length

   /* const followers = data?.getUsers.followers ?? []
   const totalCount = data?.getUsers.followersPagination.totalItems ?? 0 */
   const followers = MOCK_FOLLOWING ?? []
   const totalCount = MOCK_TOTAL_COUNT ?? 0

   const paddingClass = 'py-2'

   return (
      <div className="flex flex-col gap-4">
         <Table className="table-fixed">
            <TableHead>
               <TableRow>
                  <TableHeadCell className={paddingClass}>User ID</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Profile link</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Username</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Subscription Date</TableHeadCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {followers.length > 0 ? (
                  followers.map(follower => (
                     <TableRow key={follower.id}>
                        <TableCell className={paddingClass}>{follower.id}</TableCell>
                        <TableCell className={paddingClass}>{follower.login}</TableCell>
                        <TableCell className={paddingClass}>
                           {`${follower.firstName} ${follower.firstName}`}
                        </TableCell>
                        <TableCell className={paddingClass}>{follower.subscriptionDate}</TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={4} className="py-8 text-center">
                        No following yet
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

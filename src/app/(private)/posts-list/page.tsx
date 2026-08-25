'use client'

import { GET_POSTS_LIST } from '@/features/post/api'
import { CardPost } from '@/shared/components/CardPost'
import { SearchInput } from '@/shared/components/SearchInput'
import { NetworkStatus } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { Button, Loader, Typography } from '@filippsm/ui-kit-mypixelgram-demo'
import { useCallback, useEffect, useRef, useState } from 'react'

const Page = () => {
   const [searchValue, setSearchValue] = useState('')
   const loadMoreRef = useRef<HTMLDivElement>(null)
   const isFetchingMoreRef = useRef(false)

   const { data, loading, error, networkStatus, fetchMore, refetch } = useQuery(GET_POSTS_LIST, {
      variables: {
         cursor: null,
         searchLoginTerm: searchValue.trim() || null,
      },
      notifyOnNetworkStatusChange: true,
   })

   const posts = data?.getPostsList.publications ?? []
   const pageInfo = data?.getPostsList.pageInfo
   const isInitialLoading = loading && networkStatus === NetworkStatus.loading && !data
   const isSearching = networkStatus === NetworkStatus.setVariables
   const isFetchingMore = networkStatus === NetworkStatus.fetchMore

   const loadMore = useCallback(async () => {
      if (isFetchingMoreRef.current || !pageInfo?.hasMore || !pageInfo.nextCursor) {
         return
      }

      isFetchingMoreRef.current = true

      try {
         await fetchMore({
            variables: {
               cursor: pageInfo.nextCursor,
               searchLoginTerm: searchValue.trim() || null,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
               const publications = [
                  ...previousResult.getPostsList.publications,
                  ...fetchMoreResult.getPostsList.publications,
               ]
               const uniquePublications = Array.from(
                  new Map(publications.map(post => [post.postId, post])).values()
               )

               return {
                  getPostsList: {
                     publications: uniquePublications,
                     pageInfo: fetchMoreResult.getPostsList.pageInfo,
                  },
               }
            },
         })
      } finally {
         isFetchingMoreRef.current = false
      }
   }, [fetchMore, pageInfo, searchValue])

   useEffect(() => {
      if (!pageInfo?.hasMore || !loadMoreRef.current || isFetchingMore) return

      const observer = new IntersectionObserver(
         entries => {
            if (entries[0]?.isIntersecting) {
               void loadMore()
            }
         },
         { rootMargin: '300px' }
      )

      observer.observe(loadMoreRef.current)

      return () => observer.disconnect()
   }, [isFetchingMore, loadMore, pageInfo?.hasMore])

   if (isInitialLoading) {
      return <Loader />
   }

   if (error && posts.length === 0) {
      return (
         <div className="flex flex-col items-center">
            <Typography variant="h1" className="my-6">
               Something went wrong
            </Typography>
            <Button onClick={() => refetch()}>Try again</Button>
         </div>
      )
   }

   return (
      <>
         <SearchInput onSearch={setSearchValue} isLoading={isSearching} className="w-full" />

         {posts.length === 0 && !isSearching ? (
            <Typography variant="h1" className="my-10 text-center">
               Posts not found
            </Typography>
         ) : (
            <div className="relative">
               {isSearching && <Loader />}
               <section
                  aria-label="Posts"
                  className="mt-7 grid grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
               >
                  {posts.map(post => (
                     <CardPost
                        key={post.postId}
                        userName={post.username ?? 'Unknown user'}
                        images={post.firstFileUrl ? [post.firstFileUrl] : []}
                     />
                  ))}
               </section>
            </div>
         )}

         {pageInfo?.hasMore && (
            <div
               ref={loadMoreRef}
               className="flex h-24 items-center justify-center"
               aria-hidden="true"
            >
               {isFetchingMore && <Loader fullscreen={false} size="32px" />}
            </div>
         )}
      </>
   )
}

export default Page

'use client'

import { Button, Loader } from '@filippsm/ui-kit-mypixelgram-demo'
import { usePostsList } from '../../api/usePostsList'
import { PostsGrid } from './PostsGrid'

type UploadedFilesTabPageProps = {
   profileLogin: string
}

export const UploadedFilesTabPage = ({ profileLogin }: UploadedFilesTabPageProps) => {
   const { data, loading, error, refetch } = usePostsList(profileLogin)

   if (loading) return <Loader />

   if (error) {
      return (
         <div className="bg-dark-500 border-dark-300 mx-auto mt-12 w-fit border p-4">
            Failed to load posts. Please try again later.
            <Button onClick={() => refetch()} className="ml-8">
               Try again
            </Button>
         </div>
      )
   }

   const posts = data?.getPostsList.publications ?? []

   return (
      <div className="mt-12">
         {posts.length > 0 ? (
            <PostsGrid posts={posts} />
         ) : (
            <p className="py-8 text-center">No uploaded files yet</p>
         )}
      </div>
   )
}

'use client'

import { BanIcon } from '@/shared/icons'
import { Avatar, ImageOutline, Slider, Typography } from '@filippsm/ui-kit-mypixelgram-demo'
import { useState } from 'react'

export type CardPostProps = {
   userName: string
   avatarUrl?: string
   createdAt?: string
   description?: string
   images: string[]
}

const DESCRIPTION_PREVIEW_LENGTH = 90

export const CardPost = ({
   userName,
   avatarUrl,
   createdAt,
   description,
   images,
}: CardPostProps) => {
   const [isExpanded, setIsExpanded] = useState(false)
   const hasMore = Boolean(description && description.length > DESCRIPTION_PREVIEW_LENGTH)
   const visibleAvatarUrl =
      avatarUrl ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=334155&color=fff`
   const visibleDescription =
      description && hasMore && !isExpanded
         ? `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
         : description

   return (
      <article className="min-w-0">
         {images.length > 0 ? (
            <Slider images={images} className="h-[194px] w-full overflow-hidden" isCrop />
         ) : (
            <div className="bg-dark-500 text-light-900 flex h-[194px] w-full items-center justify-center">
               <ImageOutline width={48} height={48} aria-label="Image is unavailable" />
            </div>
         )}

         <div className="mt-2 flex min-h-9 items-center gap-3">
            <Avatar src={visibleAvatarUrl} alt={`${userName} avatar`} size="sm" />
            <Typography variant="h3" className="min-w-0 flex-1 truncate">
               {userName}
            </Typography>
            <button
               type="button"
               aria-label={`Ban ${userName}`}
               className="text-light-100 focus-visible:outline-accent-500 shrink-0 cursor-pointer rounded-full transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
               <BanIcon />
            </button>
         </div>

         {createdAt && (
            <Typography variant="smallRegular" className="text-light-900 mt-3">
               {createdAt}
            </Typography>
         )}

         {description && (
            <Typography variant="bodyRegular" className="text-light-100 mt-1">
               {visibleDescription}{' '}
               {hasMore && (
                  <button
                     type="button"
                     onClick={() => setIsExpanded(value => !value)}
                     className="text-accent-500 hover:text-accent-300 cursor-pointer underline underline-offset-2"
                  >
                     {isExpanded ? 'Hide' : 'Show more'}
                  </button>
               )}
            </Typography>
         )}
      </article>
   )
}

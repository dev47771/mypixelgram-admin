import { type ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

export function PageContainer({ className, ...rest }: ComponentPropsWithRef<'main'>) {
   return (
      <main
         className={cn(
            'mx-auto flex w-full max-w-[1280px] flex-col items-center px-[60px] pt-6',
            className
         )}
         {...rest}
      />
   )
}

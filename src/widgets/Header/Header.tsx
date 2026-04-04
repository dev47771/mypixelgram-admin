'use client'

import { ROUTES } from '@/shared/constants'
import Link from 'next/link'
import {
   FlagRussiaIcon,
   FlagUKIcon,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@filippsm/ui-kit-mypixelgram-demo'

type Props = {
   selectedLanguage?: string
}

export const Header = ({ selectedLanguage = 'EN' }: Props) => {
   const selectComponent = (
      <Select defaultValue={selectedLanguage}>
         <SelectTrigger className="w-[160px]">
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="RU">
               <FlagRussiaIcon />
               Russian
            </SelectItem>
            <SelectItem value="EN">
               <FlagUKIcon />
               English
            </SelectItem>
         </SelectContent>
      </Select>
   )
   return (
      <header className="border-dark-300 bg-dark-700 border-b">
         <div className="bg-dark-700 relative z-10 container flex h-[60px] items-center justify-between">
            {/*<Link href={ROUTES.public.signIn} className={variantClasses.large}>*/}
            <Link href={ROUTES.public.signIn} className={'text-xxl leading-l font-semibold'}>
               Inctagram
            </Link>
            <div className="flex gap-[24px]">{selectComponent}</div>
         </div>
      </header>
   )
}

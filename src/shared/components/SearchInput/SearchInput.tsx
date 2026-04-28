'use client'

import { Input, Loader } from '@filippsm/ui-kit-mypixelgram-demo'
import { useDebounce } from '@/shared/hooks'
import { ChangeEvent, ComponentPropsWithRef, useState } from 'react'

type Props = {
   delay?: number
   onSearch: (value: string) => void
   isLoading?: boolean
} & ComponentPropsWithRef<typeof Input>

export const SearchInput = ({
   delay = 300,
   onSearch,
   onChange,
   isLoading,
   value,
   defaultValue,
   ...rest
}: Props) => {
   const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
   const debounce = useDebounce(onSearch, delay)
   const inputValue = value ?? internalValue

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setInternalValue(value)
      if (onChange) {
         onChange(e)
      }
      debounce(value)
   }

   return (
      <div className={'relative w-full'}>
         <Input
            placeholder="Search"
            type="search"
            {...rest}
            value={inputValue}
            onChange={onChangeHandler}
         />
         {isLoading && (
            <span className={'pointer-events-none absolute top-1/2 right-10 -translate-y-1/2'}>
               <Loader size={'24px'} fullscreen={false} />
            </span>
         )}
      </div>
   )
}

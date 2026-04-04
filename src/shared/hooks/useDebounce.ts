import { useCallback, useEffect, useRef } from 'react'

export const useDebounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
   const timerRef = useRef<undefined | ReturnType<typeof setTimeout>>(undefined)

   useEffect(() => {
      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current)
         }
      }
   }, [])

   return useCallback(
      (...args: Parameters<T>) => {
         if (timerRef.current) {
            clearTimeout(timerRef.current)
         }

         timerRef.current = setTimeout(() => {
            fn(...args)
         }, delay)
      },
      [delay, fn]
   )
}

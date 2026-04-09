'use client'

import { Button, Card, Loader, Typography } from '@filippsm/ui-kit-mypixelgram-demo'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '../../model/schemas'
import { ControlledInput } from '@/shared/lib/controlled'

export type FormFieldError = { field: string; message: string }
type FormTypes = z.infer<typeof signInSchema>

type Props = {
   onSubmitAction: (data: FormTypes) => void
   isLoading: boolean
   errorsFromApi?: FormFieldError[]
}

export const SignInForm = ({ onSubmitAction, isLoading, errorsFromApi }: Props) => {
   const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<FormTypes>({ resolver: zodResolver(signInSchema) })

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])

   return (
      <Card className={'flex w-full max-w-[378px] flex-col items-center p-6'}>
         <Typography variant="h1">Sign In</Typography>
         <form
            onSubmit={handleSubmit(onSubmitAction)}
            className={'flex w-full flex-col items-center'}
         >
            <ControlledInput
               name={'email'}
               control={control}
               label={'Email'}
               errorMessage={errors.email?.message}
               className={'mb-6'}
               autoComplete="email"
               placeholder={'example@example.com'}
            />
            <ControlledInput
               name={'password'}
               control={control}
               className={'mb-8'}
               label={'Password'}
               type={'password'}
               errorMessage={errors.password?.message}
               placeholder={'**********'}
            />

            <Button type="submit" fullWidth disabled={isLoading} className="h-[36px]">
               {isLoading ? (
                  <Loader size="24px" color={'var(--color-light-100)'} fullscreen={false} />
               ) : (
                  'Sign In'
               )}
            </Button>
         </form>
      </Card>
   )
}

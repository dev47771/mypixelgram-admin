'use client'
import { Input } from '@filippsm/ui-kit-mypixelgram-demo'
import { InputProps } from '@filippsm/ui-kit-mypixelgram-demo/dist/components/Input/Input'
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form'

export type ControlledInputProps<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'disabled' | 'rules'
> &
   Omit<InputProps, 'onChange' | 'onChangeValue' | 'value'>

export const ControlledInput = <T extends FieldValues>(props: ControlledInputProps<T>) => {
   const { control, shouldUnregister, disabled, name, ...rest } = props

   const { field } = useController({
      control,
      disabled,
      name,
      shouldUnregister,
   })

   return <Input {...{ ...rest, ...field }} />
}

'use client'

import { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import {
   Button,
   CrossIcon,
   Modal,
   ModalBody,
   ModalClose,
   ModalTitle,
   Typography,
} from '@filippsm/ui-kit-mypixelgram-demo'

type Props = {
   open: boolean
   title?: string
   description?: ReactNode
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
   className?: string
}

export const ConfirmModal = ({
   open,
   title,
   description,
   onConfirm,
   onCancel,
   confirmText = 'Yes',
   cancelText = 'No',
   className,
}: Props) => {
   return (
      <Modal open={open} onOpenChange={onCancel}>
         <ModalTitle className="flex items-center justify-between">
            <Typography variant="h1">{title}</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className="text-dark-100 h-px" />

         <ModalBody
            className={cn(
               'flex max-w-[438px] flex-col gap-[29px] px-[24px] py-[30px_36px] whitespace-pre-line',
               className
            )}
         >
            {description && <Typography>{description}</Typography>}
            <span className="flex gap-6 self-end">
               <Button onClick={onConfirm} variant="outlined" className="h-[36px] w-[96px]">
                  {confirmText}
               </Button>
               <Button onClick={onCancel} className="h-[36px] w-[96px]">
                  {cancelText}
               </Button>
            </span>
         </ModalBody>
      </Modal>
   )
}

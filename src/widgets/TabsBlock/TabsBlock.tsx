'use client'

import {
   FollowersTabPage,
   FollowingTabPage,
   PaymentsTabPage,
   PROFILE_TAB_VALUES,
   ProfileTabType,
   UploadedFilesTabPage,
} from '@/features/user-profile'
import { ROUTES } from '@/shared/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@filippsm/ui-kit-mypixelgram-demo'
import { useRouter } from 'next/navigation'

interface TabsBlockProps {
   initialPart: string
}

export function TabsBlock({ initialPart }: TabsBlockProps) {
   const router = useRouter()

   const handleTabChange = (value: string) => {
      router.push(ROUTES.informations.create(value as ProfileTabType), { scroll: false })
   }

   return (
      <div suppressHydrationWarning className="pt-[36px] pb-[26px] pl-[24px]">
         <Tabs value={initialPart} onValueChange={handleTabChange}>
            <TabsList>
               <TabsTrigger value={PROFILE_TAB_VALUES.uploadedFiles}>Uploaded Files</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.payments}>Payments</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.followers}>Followers</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.following}>Following</TabsTrigger>
            </TabsList>
            <TabsContent value={PROFILE_TAB_VALUES.uploadedFiles}>
               <UploadedFilesTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.payments}>
               <PaymentsTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.followers}>
               <FollowersTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.following}>
               <FollowingTabPage />
            </TabsContent>
         </Tabs>
      </div>
   )
}

/* 
'use client'

import { PROFILE_TAB_VALUES, ProfileTabType } from '@/features/user-profile'
import { ROUTES } from '@/shared/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@filippsm/ui-kit-mypixelgram-demo'
import { useRouter } from 'next/navigation'


interface TabsBlockProps {
   initialPart: string
}

export function TabsBlock({ initialPart }: TabsBlockProps) {
   const router = useRouter()

   const handleTabChange = (value: string) => {
      router.push(ROUTES.settings.create(value as ProfileTabType), { scroll: false })
   }

   return (
      <div suppressHydrationWarning className="pt-[36px] pb-[26px] pl-[24px]">
         <Tabs value={initialPart} onValueChange={handleTabChange}>
            <TabsList>
               <TabsTrigger value={PROFILE_TAB_VALUES.info}>General information</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.devices}>Devices</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.subscriptions}>Subscriptions</TabsTrigger>
               <TabsTrigger value={PROFILE_TAB_VALUES.payments}>My payments</TabsTrigger>
            </TabsList>
            <TabsContent value={PROFILE_TAB_VALUES.info}>
               <InfoTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.devices}>
               <DevicesTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.subscriptions}>
               <SubscriptionTabPage />
            </TabsContent>
            <TabsContent value={PROFILE_TAB_VALUES.payments}>
               <PaymentTabPage />
            </TabsContent>
         </Tabs>
      </div>
   )
}
 */

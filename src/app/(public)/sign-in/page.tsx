import { Loader } from '@filippsm/ui-kit-mypixelgram-demo'
import { Suspense } from 'react'
import { SignInPageContent } from './SignInPageContent'

export default function SignInPage() {
   return (
      <Suspense fallback={<Loader />}>
         <SignInPageContent />
      </Suspense>
   )
}

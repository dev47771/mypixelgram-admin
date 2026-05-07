import { PROFILE_TAB_VALUES } from '@/features/user-profile'
import ProfileByLoginPageClient from './ProfileByLoginPageClient'

type PageProps = {
   params: Promise<{ login: string }>
   searchParams: Promise<{ part?: string }>
}

const Page = async ({ params, searchParams }: PageProps) => {
   const { login } = await params
   const { part } = await searchParams
   const initialPart = part ?? PROFILE_TAB_VALUES.uploadedFiles

   return <ProfileByLoginPageClient login={login} initialPart={initialPart} />
}

export default Page

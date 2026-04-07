import { redirect } from 'next/navigation'
import { ROUTES } from '@/shared/constants'

//сделать логику на проверку авторизации: если корневая страница и не залогинен - редирект на sign-in, если корневая страница и залогинен - редирект на users-list
export default function Home() {
   redirect(ROUTES.public.signIn)
}

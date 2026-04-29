import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'
import { alert } from '@filippsm/ui-kit-mypixelgram-demo'

export const errorLink = new ErrorLink(({ error }) => {
   // GraphQL ошибки
   if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(err => {
         alert.error(err.message)
      })
      return
   }

   // network error (нет интернета / сервер недоступен)
   if (error) {
      alert.error('Network or Server Error. Check your internet connection.')
   }
})

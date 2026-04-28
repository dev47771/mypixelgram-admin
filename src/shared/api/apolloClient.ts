import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { errorLink } from './apolloErrorLink'

const httpLink = new HttpLink({
   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
   credentials: 'include',
})

export const client = new ApolloClient({
   link: errorLink.concat(httpLink),
   cache: new InMemoryCache(),
})

/* import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
   link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      credentials: 'include',
   }),
   cache: new InMemoryCache(),
})
 */

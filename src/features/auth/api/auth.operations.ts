import { gql } from '@apollo/client'

export const ADMIN_LOGIN = gql`
   mutation AdminLogin($input: AdminLoginInput!) {
      adminLogin(input: $input)
   }
`

export const ADMIN_CHECKER = gql`
   query AdminChecker {
      AdminChecker
   }
`

export const ADMIN_LOGOUT = gql`
   mutation AdminLogout {
      adminLogout
   }
`

import { gql } from '@apollo/client'

export const ADMIN_LOGIN = gql`
   mutation AdminLogin($input: AdminLoginInput!) {
      adminLogin(input: $input)
   }
`

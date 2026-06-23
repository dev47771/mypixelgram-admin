import { gql } from '@apollo/client'

export const DELETE_USER = gql`
   mutation AdminDeleteUser($id: DeleteUserArgs!) {
      adminDeleteUser(id: $id)
   }
`

import { DELETE_USER, DeleteUserArgs, DeleteUserResponse } from '@/features/admin'
import { useMutation } from '@apollo/client/react'
import { alert } from '@filippsm/ui-kit-mypixelgram-demo'

export const useDeleteUser = () => {
   const [deleteUser, { data, loading, error }] = useMutation<
      DeleteUserResponse,
      { id: DeleteUserArgs }
   >(DELETE_USER, { refetchQueries: ['GetUsersList'] })

   const handleDelete = async (userId: string) => {
      try {
         const resp = await deleteUser({
            variables: { id: { userId } },
         })
         alert.success('User deleted')
         return resp
      } catch (err) {
         console.error('Delete error:', err)
         alert.error('Cant delete user')
         throw err
      }
   }

   return { deleteUser: handleDelete, loading, error, data }
}

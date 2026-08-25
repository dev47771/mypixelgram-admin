import { gql, type TypedDocumentNode } from '@apollo/client'

export type PostItem = {
   userId: string
   username: string | null
   postId: string
   firstFileUrl: string | null
}

export type PostsListResponse = {
   publications: PostItem[]
   pageInfo: {
      nextCursor: string | null
      hasMore: boolean
   }
}

export type GetPostsListQuery = {
   getPostsList: PostsListResponse
}

export type GetPostsListQueryVariables = {
   cursor?: string | null
   searchLoginTerm?: string | null
}

export const GET_POSTS_LIST: TypedDocumentNode<GetPostsListQuery, GetPostsListQueryVariables> = gql`
   query GetPostsList($cursor: String, $searchLoginTerm: String) {
      getPostsList(cursor: $cursor, searchLoginTerm: $searchLoginTerm) {
         pageInfo {
            nextCursor
            hasMore
         }
         publications {
            userId
            username
            postId
            firstFileUrl
         }
      }
   }
`

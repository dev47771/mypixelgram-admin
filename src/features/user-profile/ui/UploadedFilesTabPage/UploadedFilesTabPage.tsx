import { PostsGrid, type Publication } from './PostsGrid'

const MOCK_POST_IMAGE_URL =
   'https://avavatar.ru/images/content/1/avavatar.ru-night_sky-full_moon-378.webp'

/** Временный мок для UI, пока нет данных с бекенда */
const mockPosts: Publication[] = Array.from({ length: 20 }, (_, i) => ({
   postId: `mock-${i + 1}`,
   firstFileUrl: MOCK_POST_IMAGE_URL,
}))

export const UploadedFilesTabPage = () => {
   return (
      <div className="mt-12">
         <PostsGrid posts={mockPosts} />
      </div>
   )
}

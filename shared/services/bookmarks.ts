import { Post } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

// Функция для получения постов из закладок юзера по ID
export const getPostsBookmarksByUserId = async (postId: string): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(`${ApiRoutes.BOOKMARKS}?userId=${postId}`)).data
}

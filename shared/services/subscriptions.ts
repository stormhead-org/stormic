import { Post } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

// Функция для получения постов из подписок юзера по ID
export const getPostsSubscriptionsByUserId = async (postId: string): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(`${ApiRoutes.SUBSCRIPTIONS}?userId=${postId}`)).data
}

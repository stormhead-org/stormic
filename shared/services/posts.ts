import { Post } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(ApiRoutes.POSTS)).data
}

// Функция для получения постов конкретного пользователя по его ID
export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(`${ApiRoutes.POSTS}?userId=${userId}`)).data
}

// Функция для получения постов конкретной категории по ее ID
export const getPostsByCategoryId = async (categoryId: string): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(`${ApiRoutes.POSTS}?categoryId=${categoryId}`)).data
}

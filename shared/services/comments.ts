import { Comment } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Comment[]> => {
	return (await axiosInstance.get<Comment[]>(ApiRoutes.COMMENTS)).data
}

// Функция для получения комментов конкретного поста по его ID
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
	return (await axiosInstance.get<Comment[]>(`${ApiRoutes.COMMENTS}?postId=${postId}`)).data
}

import { Comment } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Comment[]> => {
	return (await axiosInstance.get<Comment[]>(ApiRoutes.COMMENTS)).data
}

import { Post } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Post[]> => {
	return (await axiosInstance.get<Post[]>(ApiRoutes.POSTS)).data
}

import { User } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<User[]> => {
	return (await axiosInstance.get<User[]>(ApiRoutes.USERS)).data
}

// Функция для получения конкретного юзера по ID
export const getUserById = async (userId: string): Promise<User[]> => {
	return (await axiosInstance.get<User[]>(`${ApiRoutes.USERS}?userId=${userId}`)).data
}

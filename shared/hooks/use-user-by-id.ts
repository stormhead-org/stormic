import { Api } from '@/shared/services/api-client'
import { CustomField, User } from '@prisma/client'
import React from 'react'

type UserWithCustomFields = User & { customFields: CustomField[] }

export const useUserById = (userId: string) => {
	const [user, setUser] = React.useState<UserWithCustomFields | null>(null)
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true)
				const response = await Api.users.getUserById(userId)
				
				if (Array.isArray(response)) {
					// Обработка случая, если API возвращает массив (это может быть ошибка в API)
					console.error('API вернуло массив пользователей вместо одного объекта пользователя')
					return
				}
				
				const user = response as UserWithCustomFields
				setUser(user)
			} catch (error) {
				console.error('Failed to fetch user:', error)
			} finally {
				setLoading(false)
			}
		}
		
		if (userId) {
			fetchUser()
		}
	}, [userId])
	
	return { user, loading }
}

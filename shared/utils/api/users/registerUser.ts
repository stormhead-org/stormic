// Файл: src/shared/utils/registerUser.ts
'use server'

import { HostRole, User } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'
import { TFormRegisterValues } from '../../../components/modals/auth-modal/forms/schemas'

// Тип данных для создания пользователя (без hostRoles, так как это join)
interface UserCreateData {
	email: string
	name: string
	password: string
}

export type TRegisterResponse = {
	message: string
	user: {
		id: string
		email: string
		fullName: string
		createdAt: string
	}
}

export async function registerUser(
	data: TFormRegisterValues
): Promise<TRegisterResponse> {
	try {
		// Инициализируем Payload
		const payload = await getPayload({ config })

		// 1. Получаем глобальные настройки host-settings через Local API
		const hostSettings = await payload.findGlobal({
			slug: 'host-settings',
			overrideAccess: true // Обходим проверку доступа
		})

		// 2. Проверяем, первая ли это регистрация
		const isFirstSetup = hostSettings.FIRST_SETTNGS && !hostSettings.owner

		// 3. Создаем пользователя через Local API (без hostRoles)
		const user = (await payload.create({
			collection: 'users',
			data: {
				email: data.email,
				name: data.fullName,
				password: data.password
			} as UserCreateData, // Указываем тип данных
			overrideAccess: true // Обходим проверку доступа
		})) as User // Приводим результат к типу User

		// 4. Находим или создаем роль @everyone
		const everyoneRole = await findOrCreateRole(payload, '@everyone')

		// 5. Обновляем роль @everyone, добавляя нового пользователя
		const currentUsers = Array.isArray(everyoneRole.users)
			? everyoneRole.users.map(u => (typeof u === 'object' && u?.id ? u.id : u))
			: []
		const updatedUsers = [...new Set([...currentUsers, user.id])] // Добавляем ID нового пользователя, убираем дубликаты

		await payload.update({
			collection: 'hostRoles',
			id: String(everyoneRole.id), // Приводим ID роли к строке
			data: {
				users: updatedUsers // Обновляем массив пользователей роли
			},
			overrideAccess: true // Обходим проверку доступа
		})

		// 6. Если это первый пользователь, обновляем host-settings
		if (isFirstSetup) {
			await payload.updateGlobal({
				slug: 'host-settings',
				data: {
					FIRST_SETTNGS: false,
					owner: user.id // ID пользователя — число
				},
				overrideAccess: true // Обходим проверку доступа
			})
		}

		return {
			message: 'Регистрация успешна',
			user: {
				id: String(user.id), // Приводим number к string для TRegisterResponse
				email: user.email,
				fullName: user.name,
				createdAt: user.createdAt
			}
		}
	} catch (error) {
		console.error('Ошибка при регистрации:', error)
		throw error
	}
}

// Вспомогательная функция для поиска или создания роли
async function findOrCreateRole(payload: any, name: string): Promise<HostRole> {
	const roles = await payload.find({
		collection: 'hostRoles',
		where: { name: { equals: name } },
		limit: 1,
		overrideAccess: true
	})

	if (roles.docs.length > 0) {
		return roles.docs[0] as HostRole
	}

	return (await payload.create({
		collection: 'hostRoles',
		data: { name },
		overrideAccess: true
	})) as HostRole
}

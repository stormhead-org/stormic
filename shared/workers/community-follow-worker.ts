import config from '@payload-config'
import { getPayload } from 'payload'
import { consumeCommunityFollowQueue } from '../lib/rabbitmq-client'

// Функция обработки сообщений из очереди
const processCommunityFollowMessage = async (message: any) => {
	const content = JSON.parse(message.content.toString()) // Парсинг содержимого сообщения
	const { userId, communityId, action } = content

	console.log(`Processing follow message: ${JSON.stringify(content)}`)

	const payload = await getPayload({ config })

	if (action === 'follow') {
		try {
			console.log(`User ${userId} is following community ${communityId}`)

			// Проверяем, существует ли уже такая подписка
			const existingFollow = await payload.find({
				collection: 'followCommunity',
				where: {
					user: { equals: userId },
					community: { equals: communityId }
				},
				limit: 1
			})

			if (existingFollow.docs.length > 0) {
				console.log(
					`User ${userId} is already following community ${communityId}`
				)
				return // Если подписка уже есть, ничего не делаем
			}

			// Проверяем, существуют ли пользователь и сообщество
			await payload.findByID({
				collection: 'users',
				id: userId
			})
			await payload.findByID({
				collection: 'communities',
				id: communityId
			})

			// Создаем новую запись в коллекции followCommunity
			await payload.create({
				collection: 'followCommunity',
				data: {
					user: userId,
					community: communityId
				},
				overrideAccess: true // Обход проверки доступа, если требуется
			})

			console.log(`User ${userId} followed community ${communityId}`)
		} catch (error) {
			console.error(`Failed to create follow relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumeCommunityFollowQueue
		}
	} else if (action === 'unfollow') {
		try {
			console.log(`User ${userId} is unfollowing community ${communityId}`)

			// Ищем запись в followCommunity для удаления
			const followRecord = await payload.find({
				collection: 'followCommunity',
				where: {
					user: { equals: userId },
					community: { equals: communityId }
				},
				limit: 1
			})

			if (followRecord.docs.length === 0) {
				console.log(
					`No follow relationship found for user ${userId} and community ${communityId}`
				)
				return // Если записи нет, ничего не делаем
			}

			// Удаляем запись из followCommunity
			await payload.delete({
				collection: 'followCommunity',
				id: followRecord.docs[0].id,
				overrideAccess: true // Обход проверки доступа, если требуется
			})

			console.log(`User ${userId} unfollowed community ${communityId}`)
		} catch (error) {
			console.error(`Failed to delete follow relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

// Запускаем потребление сообщений из очереди
consumeCommunityFollowQueue(processCommunityFollowMessage)

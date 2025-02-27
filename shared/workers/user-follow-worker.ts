import config from '@payload-config'
import { getPayload } from 'payload'
import { consumeFollowQueue } from '../lib/rabbitmq-client'

const processFollowMessage = async (message: any) => {
	const content = JSON.parse(message.content.toString()) // Парсинг содержимого сообщения
	const { followerId, followingId, action } = content

	console.log(`Processing follow message: ${JSON.stringify(content)}`)

	const payload = await getPayload({ config })

	if (action === 'follow') {
		try {
			console.log(`User ${followerId} is following user ${followingId}`)

			// Получаем текущие данные пользователя followingId
			const followingUser = await payload.findByID({
				collection: 'users',
				id: followingId
			})

			// Добавляем followerId в массив followers, избегая дубликатов
			const currentFollowers = Array.isArray(followingUser.followers)
				? followingUser.followers.map((f: any) =>
						typeof f === 'object' ? f.id : f
				  )
				: []
			const updatedFollowers = currentFollowers.includes(followerId)
				? currentFollowers
				: [...currentFollowers, followerId]

			// Обновляем followers пользователя followingId
			await payload.update({
				collection: 'users',
				id: followingId,
				data: {
					followers: updatedFollowers
				},
				overrideAccess: true // Учитываем права доступа
			})

			// (Опционально) Обновляем follow пользователя followerId
			const followerUser = await payload.findByID({
				collection: 'users',
				id: followerId
			})
			const currentFollow = Array.isArray(followerUser.follow)
				? followerUser.follow.map((f: any) =>
						typeof f === 'object' ? f.id : f
				  )
				: []
			const updatedFollow = currentFollow.includes(followingId)
				? currentFollow
				: [...currentFollow, followingId]

			await payload.update({
				collection: 'users',
				id: followerId,
				data: {
					follow: updatedFollow
				},
				overrideAccess: true
			})

			console.log(`User ${followerId} followed user ${followingId}`)
		} catch (error) {
			console.error(`Failed to create follow relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumeFollowQueue
		}
	} else if (action === 'unfollow') {
		try {
			console.log(`User ${followerId} is unfollowing user ${followingId}`)

			// Получаем текущие данные пользователя followingId
			const followingUser = await payload.findByID({
				collection: 'users',
				id: followingId
			})

			// Удаляем followerId из массива followers
			const currentFollowers = Array.isArray(followingUser.followers)
				? followingUser.followers.map((f: any) =>
						typeof f === 'object' ? f.id : f
				  )
				: []
			const updatedFollowers = currentFollowers.filter(id => id !== followerId)

			// Обновляем followers пользователя followingId
			await payload.update({
				collection: 'users',
				id: followingId,
				data: {
					followers: updatedFollowers
				},
				overrideAccess: true
			})

			// (Опционально) Удаляем followingId из follow пользователя followerId
			const followerUser = await payload.findByID({
				collection: 'users',
				id: followerId
			})
			const currentFollow = Array.isArray(followerUser.follow)
				? followerUser.follow.map((f: any) =>
						typeof f === 'object' ? f.id : f
				  )
				: []
			const updatedFollow = currentFollow.filter(id => id !== followingId)

			await payload.update({
				collection: 'users',
				id: followerId,
				data: {
					follow: updatedFollow
				},
				overrideAccess: true
			})

			console.log(`User ${followerId} unfollowed user ${followingId}`)
		} catch (error) {
			console.error(`Failed to delete follow relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

consumeFollowQueue(processFollowMessage)

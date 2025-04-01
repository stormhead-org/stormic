import config from '@payload-config'
import { Message } from 'amqplib'
import { getPayload } from 'payload'
import { consumePostLikeQueue } from '../lib/rabbitmq-client'

// Функция обработки сообщений из очереди
async function handlePostLikeMessage(msg: Message) {
	const content = JSON.parse(msg.content.toString()) // Парсинг содержимого сообщения
	const { userId, postId, action } = content

	console.log(`Processing like message: ${JSON.stringify(content)}`)

	const payload = await getPayload({ config })

	if (action === 'like') {
		try {
			console.log(`User ${userId} is liking post ${postId}`)

			// Проверяем, существует ли уже такой лайк
			const existingLike = await payload.find({
				collection: 'likePost',
				where: {
					user: { equals: userId },
					post: { equals: postId }
				},
				limit: 1
			})

			if (existingLike.docs.length > 0) {
				console.log(`User ${userId} has already liked post ${postId}`)
				return // Если лайк уже есть, ничего не делаем
			}

			// Проверяем, существуют ли пользователь и пост
			await payload.findByID({
				collection: 'users',
				id: userId
			})
			await payload.findByID({
				collection: 'posts',
				id: postId
			})

			// Создаем новую запись в коллекции likePost
			await payload.create({
				collection: 'likePost',
				data: {
					user: userId,
					post: postId
				},
				overrideAccess: true // Обход проверки доступа, если требуется
			})

			console.log(`User ${userId} liked post ${postId}`)
		} catch (error) {
			console.error(`Failed to create like relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumePostLikeQueue
		}
	} else if (action === 'unlike') {
		try {
			console.log(`User ${userId} is unliking post ${postId}`)

			// Ищем запись в likePost для удаления
			const likeRecord = await payload.find({
				collection: 'likePost',
				where: {
					user: { equals: userId },
					post: { equals: postId }
				},
				limit: 1
			})

			if (likeRecord.docs.length === 0) {
				console.log(
					`No like relationship found for user ${userId} and post ${postId}`
				)
				return // Если записи нет, ничего не делаем
			}

			// Удаляем запись из likePost
			await payload.delete({
				collection: 'likePost',
				id: likeRecord.docs[0].id,
				overrideAccess: true // Обход проверки доступа, если требуется
			})

			console.log(`User ${userId} unliked post ${postId}`)
		} catch (error) {
			console.error(`Failed to delete like relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

// Запускаем потребление сообщений из очереди
consumePostLikeQueue(handlePostLikeMessage)

import config from '@payload-config'
import { Message } from 'amqplib'
import { getPayload } from 'payload'
import { consumeCommentLikeQueue } from '../lib/rabbitmq-client'

async function processCommentLikeMessage(msg: Message) {
	const content = JSON.parse(msg.content.toString()) // Парсинг содержимого сообщения
	const { action, commentId, userId } = content

	console.log(`Processing like message: ${JSON.stringify(content)}`)

	const payload = await getPayload({ config })

	if (action === 'like') {
		try {
			console.log(`User ${userId} is liking comment ${commentId}`)
			// Проверяем, существует ли лайк
			const existingLike = await payload.find({
				collection: 'likeComment',
				where: {
					user: { equals: userId },
					comment: { equals: commentId }
				},
				limit: 1
			})

			if (existingLike.docs.length > 0) {
				console.log(`User ${userId} has already liked comment ${commentId}`)
				return // Если лайк уже есть, ничего не делаем
			}

			// Проверяем, существуют ли пользователь и коммент
			await payload.findByID({
				collection: 'users',
				id: userId
			})
			await payload.findByID({
				collection: 'comments',
				id: commentId
			})

			// Создаем новую запись в коллекции likeComment
			await payload.create({
				collection: 'likeComment',
				data: {
					user: userId,
					comment: commentId
				},
				overrideAccess: true
			})

			console.log(`User ${userId} liked comment ${commentId}`)
		} catch (error) {
			console.error(`Failed to create like relationship: ${error}`)
			throw error
		}
	} else if (action === 'unlike') {
		try {
			console.log(`User ${userId} is unliking comment ${commentId}`)

			// Ищем запись в likeComment для удаления
			const likeRecord = await payload.find({
				collection: 'likeComment',
				where: {
					user: { equals: userId },
					comment: { equals: commentId }
				},
				limit: 1
			})

			if (likeRecord.docs.length === 0) {
				console.log(
					`No like relationship found for user ${userId} and comment ${commentId}`
				)
				return // Если записи нет, ничего не делаем
			}

			// Удаляем запись из likeComment
			await payload.delete({
				collection: 'likeComment',
				id: likeRecord.docs[0].id,
				overrideAccess: true
			})

			console.log(`User ${userId} unliked comment ${commentId}`)
		} catch (error) {
			console.error(`Failed to delete like relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

// Запуск воркера
consumeCommentLikeQueue(processCommentLikeMessage)

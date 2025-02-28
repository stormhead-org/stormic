import config from '@payload-config'
import { Message } from 'amqplib'
import { getPayload } from 'payload'
import { consumePostLikeQueue } from '../lib/rabbitmq-client'

async function handlePostLikeMessage(msg: Message) {
	const { action, postId, userId } = JSON.parse(msg.content.toString())
	const payload = await getPayload({ config })
	if (action === 'like') {
		try {
			console.log(`User ${userId} is liked post ${postId}`)

			// Получаем текущие данные поста postId
			const likedPost = await payload.findByID({
				collection: 'posts',
				id: postId
			})

			// Добавляем userId в массив likes, избегая дубликатов
			const currentLikes = Array.isArray(likedPost.likes)
				? likedPost.likes.map((f: any) => (typeof f === 'object' ? f.id : f))
				: []
			const updatedLikes = currentLikes.includes(userId)
				? currentLikes
				: [...currentLikes, userId]

			// Обновляем likes поста postId
			await payload.update({
				collection: 'posts',
				id: postId,
				data: {
					likes: updatedLikes
				},
				overrideAccess: true
			})
		} catch (error) {
			console.error(`Failed to create like relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumeFollowQueue
		}
	} else if (action === 'unlike') {
		try {
			console.log(`User ${userId} is unlike post ${postId}`)

			// Получаем текущие данные поста postId
			const likedPost = await payload.findByID({
				collection: 'posts',
				id: postId
			})

			// Удаляем userId из массива likes
			const currentLikes = Array.isArray(likedPost.likes)
				? likedPost.likes.map((f: any) => (typeof f === 'object' ? f.id : f))
				: []
			const updatedLikes = currentLikes.filter(id => id !== userId)

			// Обновляем likes поста postId
			await payload.update({
				collection: 'posts',
				id: postId,
				data: {
					likes: updatedLikes
				},
				overrideAccess: true
			})
		} catch (error) {
			console.error(`Failed to delete like relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

consumePostLikeQueue(handlePostLikeMessage)

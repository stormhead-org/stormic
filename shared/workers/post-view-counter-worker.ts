import config from '@payload-config'
import { Message } from 'amqplib'
import { getPayload } from 'payload'
import { consumePostViewQueue } from '../lib/rabbitmq-client'

// Функция для обработки сообщений о просмотрах постов
async function processPostView(msg: Message) {
	const { postId } = JSON.parse(msg.content.toString())

	console.log(`Increment view ${postId}`)

	const payload = await getPayload({ config })

	try {
		if (typeof postId !== 'number' || isNaN(postId)) {
			console.error(`Invalid postId: ${postId}`)
			return
		}

		console.log(`Processing post view for postId: ${postId}`)

		const post = await payload.findByID({
			collection: 'posts',
			id: postId
		})

		if (!post) {
			console.error(`Post with id ${postId} not found`)
			return
		}

		await payload.update({
			collection: 'posts',
			id: postId,
			data: {
				views: (post.views || 0) + 1
			}
		})

		console.log(`Post ${postId} views incremented`)
	} catch (error) {
		console.error(`Failed to increment views for post ${postId}:`, error)
	}
}

// Настраиваем потребление сообщений
consumePostViewQueue(processPostView)

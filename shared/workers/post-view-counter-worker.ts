// import { Message } from 'amqplib'
// import { prisma } from '../../prisma/prisma-client'
// import { consumePostViewQueue } from '../lib/rabbitmq-client'
//
// // Функция для обработки сообщений о просмотрах постов
// async function processPostView(messageContent: { postId: number }) {
// 	console.log('Processing message:', messageContent)
//
// 	try {
// 		const { postId } = messageContent
//
// 		if (typeof postId !== 'number' || isNaN(postId)) {
// 			console.error(`Invalid postId: ${postId}`)
// 			return
// 		}
//
// 		console.log(`Processing post view for postId: ${postId}`)
// 		await prisma.post.update({
// 			where: { post_id: postId },
// 			data: { views_count: { increment: 1 } }
// 		})
// 		console.log(`Post ${postId} views incremented`)
// 	} catch (error) {
// 		console.error(`Failed to increment views for post ${messageContent.postId}:`, error)
// 	}
// }
//
// // Логируем начало работы воркера
// console.log('Starting post view worker...')
//
// // Настраиваем потребление сообщений
// consumePostViewQueue(async (msg: Message) => {
// 	try {
// 		const messageContent = JSON.parse(msg.content.toString()) as { postId: number }
// 		await processPostView(messageContent)
// 	} catch (error) {
// 		console.error('Failed to process message:', error)
// 	}
// })

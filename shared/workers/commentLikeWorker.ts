import { Message } from 'amqplib'
import { prisma } from '../../prisma/prisma-client'
import { consumeCommentLikeQueue } from '../lib/rabbitmq-client'

interface CommentLikeMessage {
	action: 'like' | 'unlike';
	commentId: number;
	userId: number;
}

export async function processCommentLikeMessage(msg: Message) {
	try {
		const message: CommentLikeMessage = JSON.parse(msg.content.toString())
		const { action, commentId, userId } = message
		
		if (action === 'like') {
			// Проверяем, существует ли лайк
			const existingLike = await prisma.commentLike.findFirst({
				where: { user_id: userId, comment_id: commentId }
			})
			
			if (!existingLike) {
				// Добавляем лайк
				await prisma.commentLike.create({
					data: { user_id: userId, comment_id: commentId }
				})
				
				// Увеличиваем счетчик лайков
				await prisma.comment.update({
					where: { comment_id: commentId },
					data: { likes_count: { increment: 1 } }
				})
			}
		} else if (action === 'unlike') {
			// Проверяем, существует ли лайк
			const existingLike = await prisma.commentLike.findFirst({
				where: { user_id: userId, comment_id: commentId }
			})
			
			if (existingLike) {
				// Удаляем лайк
				await prisma.commentLike.delete({
					where: { like_id: existingLike.like_id }
				})
				
				// Уменьшаем счетчик лайков
				await prisma.comment.update({
					where: { comment_id: commentId },
					data: { likes_count: { decrement: 1 } }
				})
			}
		}
	} catch (error) {
		console.error('Error processing comment like message:', error)
	}
}

// Запуск воркера
consumeCommentLikeQueue(processCommentLikeMessage)

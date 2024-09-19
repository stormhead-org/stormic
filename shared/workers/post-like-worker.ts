import { Message } from 'amqplib'
import { prisma } from '../../prisma/prisma-client'
import { consumePostLikeQueue } from '../lib/rabbitmq-client'

async function handlePostLikeMessage(msg: Message) {
	const { action, postId, userId } = JSON.parse(msg.content.toString())
	
	if (action === 'like') {
		// Проверяем, существует ли уже лайк
		const existingLike = await prisma.postLike.findUnique({
			where: {
				user_id_post_id: {
					user_id: userId,
					post_id: postId
				}
			}
		})
		
		if (!existingLike) {
			// Создаем запись о лайке
			await prisma.postLike.create({
				data: {
					user_id: userId,
					post_id: postId
				}
			})
			
			// Увеличиваем количество лайков
			await prisma.post.update({
				where: { post_id: postId },
				data: {
					likes_count: {
						increment: 1
					}
				}
			})
		}
	} else if (action === 'unlike') {
		// Проверяем, существует ли уже лайк
		const existingLike = await prisma.postLike.findUnique({
			where: {
				user_id_post_id: {
					user_id: userId,
					post_id: postId
				}
			}
		})
		
		if (existingLike) {
			// Удаляем лайк
			await prisma.postLike.delete({
				where: {
					user_id_post_id: {
						user_id: userId,
						post_id: postId
					}
				}
			})
			
			// Уменьшаем количество лайков
			await prisma.post.update({
				where: { post_id: postId },
				data: {
					likes_count: {
						decrement: 1
					}
				}
			})
		}
	}
}

consumePostLikeQueue(handlePostLikeMessage)

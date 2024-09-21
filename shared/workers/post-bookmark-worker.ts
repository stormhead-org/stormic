import { Message } from 'amqplib'
import { prisma } from '../../prisma/prisma-client'
import { consumeBookmarkAddMQueue } from '../lib/rabbitmq-client'

async function handleAddBookmarksMessage(msg: Message) {
	const { action, postId, userId } = JSON.parse(msg.content.toString())
	
	if (action === 'post') {
		// Проверяем, добавлена ли уже закладка
		const existingLike = await prisma.bookmark.findUnique({
			where: {
				user_id_post_id: {
					user_id: userId,
					post_id: postId
				}
			}
		})
		
		if (!existingLike) {
			// Добавляем закладку
			await prisma.bookmark.create({
				data: {
					user_id: userId,
					post_id: postId
				}
			})
		}
	} else if (action === 'delete') {
		// Проверяем, добавлена ли уже закладка
		const existingLike = await prisma.bookmark.findUnique({
			where: {
				user_id_post_id: {
					user_id: userId,
					post_id: postId
				}
			}
		})
		
		if (existingLike) {
			// Удаляем закладку
			await prisma.bookmark.delete({
				where: {
					user_id_post_id: {
						user_id: userId,
						post_id: postId
					}
				}
			})
		}
	}
}

consumeBookmarkAddMQueue(handleAddBookmarksMessage)

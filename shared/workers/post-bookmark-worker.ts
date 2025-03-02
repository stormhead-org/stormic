import config from '@payload-config'
import { Message } from 'amqplib'
import { getPayload } from 'payload'
import { consumeBookmarkAddMQueue } from '../lib/rabbitmq-client'

async function handleAddBookmarksMessage(msg: Message) {
	const { action, postId, userId } = JSON.parse(msg.content.toString())
	const payload = await getPayload({ config })
	if (action === 'post') {
		try {
			console.log(`User ${userId} is add bookmark post ${postId}`)
			
			// Получаем текущие данные поста postId
			const bookmarkPost = await payload.findByID({
				collection: 'posts',
				id: postId
			})
			
			// Добавляем userId в массив bookmarks, избегая дубликатов
			const currentBookmarks = Array.isArray(bookmarkPost.bookmarks)
				? bookmarkPost.bookmarks.map((f: any) => (typeof f === 'object' ? f.id : f))
				: []
			const updatedBookmarks = currentBookmarks.includes(userId)
				? currentBookmarks
				: [...currentBookmarks, userId]
			
			// Обновляем bookmarks поста postId
			await payload.update({
				collection: 'posts',
				id: postId,
				data: {
					bookmarks: updatedBookmarks
				},
				overrideAccess: true
			})
		} catch (error) {
			console.error(`Failed to create bookmark relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumeFollowQueue
		}
	} else if (action === 'delete') {
		try {
			console.log(`User ${userId} is remove bookmark post ${postId}`)
			
			// Получаем текущие данные поста postId
			const bookmarkPost = await payload.findByID({
				collection: 'posts',
				id: postId
			})
			
			// Удаляем userId из массива bookmarks
			const currentBookmarks = Array.isArray(bookmarkPost.bookmarks)
				? bookmarkPost.bookmarks.map((f: any) => (typeof f === 'object' ? f.id : f))
				: []
			const updatedBookmarks = currentBookmarks.filter(id => id !== userId)
			
			// Обновляем bookmarks поста postId
			await payload.update({
				collection: 'posts',
				id: postId,
				data: {
					bookmarks: updatedBookmarks
				},
				overrideAccess: true
			})
		} catch (error) {
			console.error(`Failed to delete bookmarks relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
}

consumeBookmarkAddMQueue(handleAddBookmarksMessage)

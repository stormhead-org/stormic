import config from '@payload-config'
import { getPayload } from 'payload'
import { consumeCommunityFollowQueue } from '../lib/rabbitmq-client';

const processCommunityFollowMessage = async (message: any) => {
	const content = JSON.parse(message.content.toString()) // Парсинг содержимого сообщения
	const { userId, communityId, action } = content
	
	console.log(`Processing follow message: ${JSON.stringify(content)}`)
	
	const payload = await getPayload({ config })
	
	if (action === 'follow') {
		try {
			console.log(`User ${userId} is following community ${communityId}`)
			
			// Получаем текущие данные сообщества communityId
			const followingCommunity = await payload.findByID({
				collection: 'communities',
				id: communityId
			})
			
			// Добавляем userId в массив followers, избегая дубликатов
			const currentFollowers = Array.isArray(followingCommunity.followers)
				? followingCommunity.followers.map((f: any) =>
					typeof f === 'object' ? f.id : f
				)
				: []
			const updatedFollowers = currentFollowers.includes(userId)
				? currentFollowers
				: [...currentFollowers, userId]
			
			// Обновляем followers сообщества communityId
			await payload.update({
				collection: 'communities',
				id: communityId,
				data: {
					followers: updatedFollowers
				},
				overrideAccess: true
			})
			
			console.log(`User ${userId} followed community ${communityId}`)
		} catch (error) {
			console.error(`Failed to create follow relationship: ${error}`)
			throw error // Пробрасываем ошибку для обработки в consumeFollowQueue
		}
	} else if (action === 'unfollow') {
		try {
			console.log(`User ${userId} is unfollowing community ${communityId}`)
			
			// Получаем текущие данные сообщества communityId
			const followingCommunity = await payload.findByID({
				collection: 'users',
				id: communityId
			})
			
			// Удаляем userId из массива followers
			const currentFollowers = Array.isArray(followingCommunity.followers)
				? followingCommunity.followers.map((f: any) =>
					typeof f === 'object' ? f.id : f
				)
				: []
			const updatedFollowers = currentFollowers.filter(id => id !== userId)
			
			// Обновляем followers сообщества communityId
			await payload.update({
				collection: 'communities',
				id: communityId,
				data: {
					followers: updatedFollowers
				},
				overrideAccess: true
			})
			
			console.log(`User ${userId} unfollowed community ${communityId}`)
		} catch (error) {
			console.error(`Failed to delete follow relationship: ${error}`)
			throw error // Пробрасываем ошибку
		}
	} else {
		console.warn(`Unknown action: ${action}`)
	}
};

consumeCommunityFollowQueue(processCommunityFollowMessage);

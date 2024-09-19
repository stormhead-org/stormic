import { prisma } from '../../prisma/prisma-client';
import { consumeCommunityFollowQueue } from '../lib/rabbitmq-client';

const processCommunityFollowMessage = async (msg: any) => {
	try {
		const content = JSON.parse(msg.content.toString()); // Парсинг содержимого сообщения
		const { userId, categoryId, action } = content;
		
		console.log(`Processing community follow message: ${JSON.stringify(content)}`);
		
		if (action === 'follow') {
			try {
				console.log(`User ${userId} is following category ${categoryId}`);
				await prisma.categorySubscription.create({
					data: {
						user_id: userId,
						category_id: categoryId,
					},
				});
				console.log(`User ${userId} followed category ${categoryId}`);
			} catch (error) {
				console.error(`Failed to create category subscription: ${error}`);
			}
		} else if (action === 'unfollow') {
			try {
				console.log(`User ${userId} is unfollowing category ${categoryId}`);
				await prisma.categorySubscription.deleteMany({
					where: {
						user_id: userId,
						category_id: categoryId,
					},
				});
				console.log(`User ${userId} unfollowed category ${categoryId}`);
			} catch (error) {
				console.error(`Failed to delete category subscription: ${error}`);
			}
		} else {
			console.warn(`Unknown action: ${action}`);
		}
	} catch (error) {
		console.error(`Failed to process community follow message: ${error}`);
	}
};

consumeCommunityFollowQueue(processCommunityFollowMessage);

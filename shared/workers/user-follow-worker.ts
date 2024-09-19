import { prisma } from '../../prisma/prisma-client';
import { consumeFollowQueue } from '../lib/rabbitmq-client';

const processFollowMessage = async (message: any) => {
	const content = JSON.parse(message.content.toString()); // Парсинг содержимого сообщения
	const { followerId, followingId, action } = content;
	
	console.log(`Processing follow message: ${JSON.stringify(content)}`);
	
	if (action === 'follow') {
		try {
			console.log(`User ${followerId} is following user ${followingId}`);
			await prisma.userSubscription.create({
				data: {
					followerId,
					followingId,
				},
			});
			console.log(`User ${followerId} followed user ${followingId}`);
		} catch (error) {
			console.error(`Failed to create follow relationship: ${error}`);
		}
	} else if (action === 'unfollow') {
		try {
			console.log(`User ${followerId} is unfollowing user ${followingId}`);
			await prisma.userSubscription.delete({
				where: {
					followerId_followingId: {
						followerId,
						followingId,
					},
				},
			});
			console.log(`User ${followerId} unfollowed user ${followingId}`);
		} catch (error) {
			console.error(`Failed to delete follow relationship: ${error}`);
		}
	} else {
		console.warn(`Unknown action: ${action}`);
	}
};

consumeFollowQueue(processFollowMessage);

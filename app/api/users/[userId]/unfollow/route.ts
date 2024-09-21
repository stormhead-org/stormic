import { NextRequest, NextResponse } from 'next/server';
import { sendFollowMessage, sendMessageToQueue } from '@/shared/lib/rabbitmq-client'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/shared/constants/auth-options';

export async function DELETE(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const followerId = parseInt(session.user.id, 10); // текущий пользователь
		const { followingId } = await request.json(); // пользователь, от которого отписываются
		
		if (!followingId) {
			return NextResponse.json({ error: 'followingId is required' }, { status: 400 });
		}
		
		// Отправляем сообщение в RabbitMQ для отписки
		// await sendMessageToQueue('userFollowQueue', {
		// 	followerId,
		// 	followingId,
		// 	action: 'unfollow',
		// });
		
		await sendFollowMessage({ action: 'unfollow', followerId, followingId })
		
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error while processing unfollow:', error);
		return NextResponse.json({ error: 'Failed to unfollow' }, { status: 500 });
	}
}

import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToQueue } from '@/shared/lib/rabbitmq-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/shared/constants/auth-options';

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const followerId = parseInt(session.user.id, 10);
		const { followingId } = await request.json();
		
		if (!followingId) {
			return NextResponse.json({ error: 'followingId is required' }, { status: 400 });
		}
		
		await sendMessageToQueue('userFollowQueue', {
			followerId,
			followingId,
			action: 'follow',
		});
		
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error while processing follow:', error);
		return NextResponse.json({ error: 'Failed to follow' }, { status: 500 });
	}
}

import { NextRequest, NextResponse } from 'next/server';
import { sendCommunityFollowMessage } from '@/shared/lib/rabbitmq-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/shared/constants/auth-options';

export async function DELETE(request: NextRequest, { params }: { params: { categoryId: string } }) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const userId = parseInt(session.user.id, 10);
		const categoryId = parseInt(params.categoryId, 10);
		
		if (isNaN(categoryId)) {
			return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 });
		}
		
		await sendCommunityFollowMessage({
			userId,
			categoryId,
			action: 'unfollow',
		});
		
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error while processing unfollow:', error);
		return NextResponse.json({ error: 'Failed to unfollow' }, { status: 500 });
	}
}

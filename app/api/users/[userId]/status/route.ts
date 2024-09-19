import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/shared/constants/auth-options';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	const userId = Number(params.userId);
	
	try {
		// Получаем текущего пользователя из сессии
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const currentUserId = Number(session.user.id);
		
		// Проверяем количество подписчиков
		const followersCount = await prisma.userSubscription.count({
			where: { followingId: userId },
		});
		
		// Проверяем, подписан ли текущий пользователь на данного пользователя
		const isFollowing = !!(await prisma.userSubscription.findFirst({
			where: {
				followerId: currentUserId,
				followingId: userId,
			},
		}));
		
		return NextResponse.json({ followersCount, isFollowing }, { status: 200 });
	} catch (error) {
		console.error('Error fetching follow status:', error);
		return NextResponse.json({ error: 'Failed to fetch follow status' }, { status: 500 });
	}
}

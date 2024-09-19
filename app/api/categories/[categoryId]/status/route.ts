import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/shared/constants/auth-options';

export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
	const categoryId = Number(params.categoryId);
	
	if (isNaN(categoryId)) {
		return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 });
	}
	
	try {
		// Получаем текущего пользователя из сессии
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const userId = Number(session.user.id);
		
		// Проверяем количество подписчиков
		const followersCount = await prisma.categorySubscription.count({
			where: { category_id: categoryId },
		});
		
		// Проверяем, подписан ли текущий пользователь на данную категорию
		const isFollowing = !!(await prisma.categorySubscription.findFirst({
			where: {
				user_id: userId,
				category_id: categoryId,
			},
		}));
		
		return NextResponse.json({ followersCount, isFollowing }, { status: 200 });
	} catch (error) {
		console.error('Error fetching follow status:', error);
		return NextResponse.json({ error: 'Failed to fetch follow status' }, { status: 500 });
	}
}

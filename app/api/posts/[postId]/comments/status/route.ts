import { authOptions } from '@/shared/constants';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';

export async function GET(req: Request, { params }: { params: { postId: string } }) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const comments = await prisma.comment.findMany({
			where: { post_id: Number(params.postId) },
			include: {
				author: true, // Включает данные об авторе
				children: true, // Включает ответы на комментарии
			},
			orderBy: {
				publication_date: 'asc',
			},
		});
		
		return NextResponse.json(comments, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
	}
}

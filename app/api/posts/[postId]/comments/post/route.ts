import { authOptions } from '@/shared/constants';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';

export async function POST(req: Request, { params }: { params: { postId: string } }) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const { content, parent_comment_id } = await req.json();
		if (!content || content.trim() === '') {
			return NextResponse.json({ error: 'Content is required' }, { status: 400 });
		}
		
		const newComment = await prisma.comment.create({
			data: {
				content,
				post_id: Number(params.postId),
				author_id: Number(session.user.id),
				parent_comment_id: parent_comment_id ? Number(parent_comment_id) : null,
			},
		});
		
		return NextResponse.json(newComment, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
	}
}

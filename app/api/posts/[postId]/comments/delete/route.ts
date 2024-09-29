import { authOptions } from '@/shared/constants';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const { commentId } = await req.json();
		
		const comment = await prisma.comment.findUnique({
			where: { comment_id: commentId },
		});
		
		if (!comment || String(comment.author_id) !== session.user.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		await prisma.comment.delete({
			where: { comment_id: commentId },
		});
		
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
	}
}

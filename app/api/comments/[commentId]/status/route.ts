import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { commentId: string } }) {
	const commentId = parseInt(params.commentId)
	
	try {
		const comment = await prisma.comment.findUnique({
			where: { comment_id: commentId }
		})
		
		if (!comment) {
			return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
		}
		
		let hasLiked = false
		const session = await getServerSession(authOptions)
		if (session) {
			const userId = parseInt(session.user.id)
			const existingLike = await prisma.commentLike.findFirst({
				where: { user_id: userId, comment_id: commentId }
			})
			hasLiked = !!existingLike
		}
		
		return NextResponse.json({
			likesCount: comment.likes_count,
			hasLiked
		}, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

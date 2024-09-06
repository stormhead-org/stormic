import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		
		const userId = Number(session.user.id)
		const url = new URL(request.url)
		const commentId = Number(url.pathname.split('/')[3])
		
		if (isNaN(commentId)) {
			return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 })
		}
		
		const existingLike = await prisma.commentLike.findFirst({
			where: {
				user_id: userId,
				comment_id: commentId
			}
		})
		
		if (existingLike) {
			return NextResponse.json({ message: 'Already liked' }, { status: 400 })
		}
		
		await prisma.commentLike.create({
			data: {
				user_id: userId,
				comment_id: commentId
			}
		})
		
		await prisma.comment.update({
			where: { comment_id: commentId },
			data: {
				likes_count: {
					increment: 1
				}
			}
		})
		
		return NextResponse.json({ message: 'Comment liked' })
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

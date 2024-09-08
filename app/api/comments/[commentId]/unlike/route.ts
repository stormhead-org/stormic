import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { sendMessageToQueue } from '@/shared/lib/rabbitmq-client'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: { commentId: string } }) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		
		const userId = parseInt(session.user.id)
		const commentId = parseInt(params.commentId)
		
		const existingLike = await prisma.commentLike.findFirst({
			where: { user_id: userId, comment_id: commentId }
		})
		
		if (!existingLike) {
			return NextResponse.json({ message: 'Not liked yet' }, { status: 400 })
		}
		
		await prisma.commentLike.delete({
			where: { like_id: existingLike.like_id }
		})
		
		await prisma.comment.update({
			where: { comment_id: commentId },
			data: { likes_count: { decrement: 1 } }
		})
		
		// Отправляем сообщение в RabbitMQ
		await sendMessageToQueue('comment_unliked', JSON.stringify({ commentId, userId }))
		
		return NextResponse.json({ message: 'Unliked successfully' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}


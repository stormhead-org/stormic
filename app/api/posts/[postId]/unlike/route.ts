import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { sendMessageToQueue } from '@/shared/lib/rabbitmq-client'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		
		const userId = parseInt(session.user.id)
		const postId = parseInt(params.postId)
		
		const existingLike = await prisma.postLike.findFirst({
			where: { user_id: userId, post_id: postId }
		})
		
		if (!existingLike) {
			return NextResponse.json({ message: 'Not liked yet' }, { status: 400 })
		}
		
		await prisma.postLike.delete({
			where: { like_id: existingLike.like_id }
		})
		
		await prisma.post.update({
			where: { post_id: postId },
			data: { likes_count: { decrement: 1 } }
		})
		
		// Отправляем сообщение в RabbitMQ
		await sendMessageToQueue('post_unliked', JSON.stringify({ postId, userId }))
		
		return NextResponse.json({ message: 'Unliked successfully' }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

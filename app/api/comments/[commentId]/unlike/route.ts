import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { sendCommentLikeMessage } from '@/shared/lib/rabbitmq-client'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
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
		
		// Проверка на существующий лайк
		const existingLike = await prisma.commentLike.findFirst({
			where: {
				user_id: userId,
				comment_id: commentId
			}
		})
		
		if (!existingLike) {
			return NextResponse.json({ message: 'Not liked yet' }, { status: 400 })
		}
		
		// Отправляем сообщение в очередь для обработки снятия лайка
		await sendCommentLikeMessage({ action: 'unlike', commentId, userId })
		
		return NextResponse.json({ message: 'Comment unlike request sent to worker' })
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

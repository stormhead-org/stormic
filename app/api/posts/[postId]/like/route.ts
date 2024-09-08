import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { sendMessageToQueue } from '@/shared/lib/rabbitmq-client'
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
		const postId = Number(url.pathname.split('/')[3])
		
		if (isNaN(postId)) {
			return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
		}
		
		const existingLike = await prisma.postLike.findUnique({
			where: {
				user_id_post_id: {
					user_id: userId,
					post_id: postId
				}
			}
		})
		
		if (existingLike) {
			return NextResponse.json({ message: 'Already liked' }, { status: 400 })
		}
		
		await prisma.postLike.create({
			data: {
				user_id: userId,
				post_id: postId
			}
		})
		
		await prisma.post.update({
			where: { post_id: postId },
			data: {
				likes_count: {
					increment: 1
				}
			}
		})
		
		// Отправляем сообщение в RabbitMQ
		await sendMessageToQueue('post_liked', JSON.stringify({ postId, userId }))
		
		return NextResponse.json({ message: 'Post liked' })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

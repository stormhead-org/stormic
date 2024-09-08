import { sendPostViewMessage } from '@/shared/lib/rabbitmq-client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { postId } = await request.json() // Получаем postId из тела запроса
		
		if (typeof postId !== 'number' || isNaN(postId)) {
			return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
		}
		
		// Отправляем сообщение в очередь RabbitMQ
		await sendPostViewMessage(postId)
		
		return NextResponse.json({ message: 'Post view message sent' })
	} catch (error) {
		console.error('Failed to send view message:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

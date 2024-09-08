import { authOptions } from '@/shared/constants/auth-options'
import { sendPostLikeMessage } from '@/shared/lib/rabbitmq-client'
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
		const postId = Number(url.pathname.split('/')[3])
		
		if (isNaN(postId)) {
			return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
		}
		
		// Отправляем сообщение в очередь для обработки снятия лайка
		await sendPostLikeMessage({ action: 'unlike', postId, userId })
		
		return NextResponse.json({ message: 'Unlike request sent to worker' })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

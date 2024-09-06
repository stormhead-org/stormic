import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		// Получаем сессию
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		
		// Получаем userId из сессии
		const userId = Number(session.user.id)
		
		// Получаем postId из URL
		const url = new URL(request.url)
		const postId = Number(url.pathname.split('/')[3]) // Исправлено извлечение postId
		
		if (isNaN(postId)) {
			return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
		}
		
		// Проверяем, поставил ли уже пользователь лайк
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
		
		// Добавляем новый лайк
		await prisma.postLike.create({
			data: {
				user_id: userId,
				post_id: postId
			}
		})
		
		// Увеличиваем счетчик лайков
		await prisma.post.update({
			where: { post_id: postId },  // Используем правильное имя поля
			data: {
				likes_count: {
					increment: 1
				}
			}
		})
		
		return NextResponse.json({ message: 'Post liked' })
	} catch (error) {
		console.error('Error in liking post:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

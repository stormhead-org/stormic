import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { postId: string } }) {
	const postId = parseInt(params.postId)
	
	try {
		const bookmarksCount = await prisma.bookmark.count({
			where: {
				post_id: postId
			}
		})
		
		// Если пользователь авторизован, проверяем, добавляли ли он пост в закладки
		let hasAdded = false
		const session = await getServerSession(authOptions)
		if (session) {
			const userId = parseInt(session.user.id)
			const bookmarkAdded = await prisma.bookmark.findFirst({
				where: { user_id: userId, post_id: postId }
			})
			hasAdded = !!bookmarkAdded
		}
		
		return NextResponse.json({
			bookmarksCount,
			hasAdded
		}, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

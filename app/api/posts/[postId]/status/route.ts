import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { postId: string } }) {
	const postId = parseInt(params.postId)
	
	try {
		const post = await prisma.post.findUnique({
			where: { post_id: postId }
		})
		
		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}
		
		// Если пользователь авторизован, проверяем, лайкал ли он пост
		let hasLiked = false
		const session = await getServerSession(authOptions)
		if (session) {
			const userId = parseInt(session.user.id)
			const existingLike = await prisma.postLike.findFirst({
				where: { user_id: userId, post_id: postId }
			})
			hasLiked = !!existingLike
		}
		
		return NextResponse.json({
			likesCount: post.likes_count,
			hasLiked
		}, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

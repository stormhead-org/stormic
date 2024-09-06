import { prisma } from '@/prisma/prisma-client'
import { authOptions } from '@/shared/constants/auth-options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { postId: string } }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	
	const userId = parseInt(session.user.id)
	const postId = parseInt(params.postId)
	
	try {
		const existingLike = await prisma.postLike.findFirst({
			where: { user_id: userId, post_id: postId }
		})
		
		const post = await prisma.post.findUnique({
			where: { post_id: postId }
		})
		
		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}
		
		return NextResponse.json({
			likesCount: post.likes_count,
			hasLiked: !!existingLike
		}, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

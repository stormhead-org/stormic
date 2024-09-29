import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET() {
	const comments = await prisma.comment.findMany({
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true
				}
			},
			post: {
				select: {
					title: true
				}
			},
			likes: true // Включаем лайки для каждого комментария
		}
	})
	
	const commentsFlat = comments.map(comment => ({
		comment_id: comment.comment_id,
		content: comment.content,
		publication_date: format(new Date(comment.publication_date), 'dd.MM.yy'),
		update_date: comment.update_date ? format(new Date(comment.update_date), 'dd.MM.yy') : null,
		post_id: comment.post_id,
		post_title: comment.post?.title,
		author_id: comment.author_id,
		author_fullName: comment.author.fullName,
		author_profile_picture: comment.author.profile_picture,
		parent_comment_id: comment.parent_comment_id,
		likes_count: comment.likes.length, // Количество лайков
		children: []  // Дети пустые, так как мы не показываем иерархию
	}))
	
	return NextResponse.json(commentsFlat)
}

import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET() {
	const posts = await prisma.post.findMany({
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true
				}
			},
			category: {
				select: {
					category_name: true
				}
			}
		}
	})
	
	// Проходим по каждому посту и добавляем количество закладок
	const postsWithDetails = await Promise.all(
		posts.map(async (post) => {
			// Подсчитываем количество закладок для каждого поста
			const bookmarksCount = await prisma.bookmark.count({
				where: {
					post_id: post.post_id // Используем идентификатор текущего поста
				}
			})
			const commentsCount = await prisma.comment.count({
				where: {
					post_id: post.post_id // Используем идентификатор текущего поста
				}
			})
			
			return {
				...post,
				commentsCount,  // Добавляем количество комментариев к посту
				bookmarksCount, // Добавляем количество закладок к посту
				publication_date: format(new Date(post.publication_date), 'dd.MM.yy')
			}
		})
	)
	
	return NextResponse.json(postsWithDetails)
}

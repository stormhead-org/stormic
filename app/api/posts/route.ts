import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	// Получаем параметры запроса
	const url = new URL(request.url)
	const userId = url.searchParams.get('userId')
	
	// Условие для фильтрации постов: если `userId` передан, то фильтруем по нему
	const whereCondition = userId ? { author_id: Number(userId) } : {}
	
	// Ищем посты (либо все, либо для конкретного пользователя)
	const posts = await prisma.post.findMany({
		where: whereCondition,
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
	
	// Проходим по каждому посту и добавляем количество закладок и комментариев
	const postsWithDetails = await Promise.all(
		posts.map(async (post) => {
			const bookmarksCount = await prisma.bookmark.count({
				where: {
					post_id: post.post_id
				}
			})
			const commentsCount = await prisma.comment.count({
				where: {
					post_id: post.post_id
				}
			})
			
			return {
				...post,
				commentsCount,
				bookmarksCount,
				publication_date: format(new Date(post.publication_date), 'dd.MM.yy')
			}
		})
	)
	
	return NextResponse.json(postsWithDetails)
}

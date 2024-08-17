import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	// Получаем параметры запроса
	const url = new URL(request.url)
	const userId = url.searchParams.get('userId')
	const categoryId = url.searchParams.get('categoryId')
	const postId = url.searchParams.get('postId')
	
	// Создаем объект условия для фильтрации
	const whereCondition: any = {}
	
	if (userId) {
		whereCondition.author_id = Number(userId)
	}
	
	if (categoryId) {
		whereCondition.category_id = Number(categoryId)
	}
	
	if (postId) {
		whereCondition.post_id = Number(postId)
	}
	
	// Если указан `postId`, ищем конкретный пост
	if (postId) {
		const post = await prisma.post.findUnique({
			where: { post_id: Number(postId) },
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
		
		if (post) {
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
			
			const postWithDetails = {
				post_id: post.post_id,
				title: post.title,
				post_image: post.post_image,
				content: post.content,
				publication_date: format(new Date(post.publication_date), 'dd.MM.yy'),
				last_edit_date: post.last_edit_date,
				post_status: post.PostStatus,
				likes_count: post.likes_count,
				views_count: post.views_count,
				author_id: post.author_id,
				author_fullName: post.author.fullName,
				author_profile_picture: post.author.profile_picture,
				category_id: post.category_id,
				category_name: post.category.category_name,
				commentsCount,
				bookmarksCount
			}
			
			return NextResponse.json(postWithDetails)
		} else {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}
	} else {
		// Ищем посты с учетом фильтрации по userId и categoryId
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
				
				// Возвращаем новый объект с перенесенными на верхний уровень свойствами
				return {
					post_id: post.post_id,
					title: post.title,
					content: post.content,
					post_image: post.post_image,
					author_fullName: post.author.fullName,
					author_profile_picture: post.author.profile_picture,
					category_name: post.category.category_name,
					likes_count: post.likes_count,
					views_count: post.views_count,
					publication_date: format(new Date(post.publication_date), 'dd.MM.yy'),
					last_edit_date: post.last_edit_date,
					post_status: post.PostStatus,
					author_id: post.author_id,
					category_id: post.category_id,
					commentsCount,
					bookmarksCount
				}
			})
		)
		
		return NextResponse.json(postsWithDetails)
	}
}

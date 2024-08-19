import { prisma } from '@/prisma/prisma-client'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const userId = url.searchParams.get('userId')
	
	if (!userId) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 })
	}
	
	const userIdNum = Number(userId)
	
	// Получаем список закладок пользователя
	const bookmarks = await prisma.bookmark.findMany({
		where: {
			user_id: userIdNum
		},
		select: {
			post_id: true
		}
	})
	
	const bookmarkedPostIds = bookmarks.map(bookmark => bookmark.post_id)
	
	// Если нет закладок, возвращаем пустой массив
	if (bookmarkedPostIds.length === 0) {
		return NextResponse.json([])
	}
	
	// Получаем информацию о постах, добавленных в закладки
	const bookmarkedPosts = await prisma.post.findMany({
		where: {
			post_id: {
				in: bookmarkedPostIds
			}
		},
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
			},
			tags: {
				include: {
					tag: {
						select: {
							tag_name: true
						}
					}
				}
			}
		}
	})
	
	// Проходим по каждому посту и добавляем количество закладок и комментариев
	const postsWithDetails = await Promise.all(
		bookmarkedPosts.map(async (post) => {
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
				bookmarksCount,
				tags: post.tags.map(pt => pt.tag.tag_name) // Массив имен тегов
			}
		})
	)
	
	return NextResponse.json(postsWithDetails)
}

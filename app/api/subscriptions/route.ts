// src/app/api/subscriptions/posts/route.ts

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
	
	// Получаем список пользователей, на которых подписан указанный пользователь
	const subscriptions = await prisma.userSubscription.findMany({
		where: {
			followerId: userIdNum
		},
		select: {
			followingId: true
		}
	})
	
	const followingUserIds = subscriptions.map(subscription => subscription.followingId)
	
	// Получаем список категорий, на которые подписан указанный пользователь
	const categorySubscriptions = await prisma.categorySubscription.findMany({
		where: {
			user_id: userIdNum
		},
		select: {
			category_id: true
		}
	})
	
	const subscribedCategoryIds = categorySubscriptions.map(subscription => subscription.category_id)
	
	// Если нет подписок, возвращаем пустой массив
	if (followingUserIds.length === 0 && subscribedCategoryIds.length === 0) {
		return NextResponse.json([])
	}
	
	// Получаем посты от пользователей, на которых подписан указанный пользователь
	const userPostsPromise = followingUserIds.length > 0 ? prisma.post.findMany({
		where: {
			author_id: {
				in: followingUserIds
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
	}) : Promise.resolve([])
	
	// Получаем посты из категорий, на которые подписан указанный пользователь
	const categoryPostsPromise = subscribedCategoryIds.length > 0 ? prisma.post.findMany({
		where: {
			category_id: {
				in: subscribedCategoryIds
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
	}) : Promise.resolve([])
	
	// Ожидаем выполнения обоих запросов
	const [userPosts, categoryPosts] = await Promise.all([userPostsPromise, categoryPostsPromise])
	
	// Объединяем результаты и удаляем дубликаты
	const allPosts = [...userPosts, ...categoryPosts]
	
	// Удаляем дубликаты, используя уникальные идентификаторы постов
	const uniquePosts = Array.from(new Map(allPosts.map(post => [post.post_id, post])).values())
	
	// Проходим по каждому посту и добавляем количество закладок и комментариев
	const postsWithDetails = await Promise.all(
		uniquePosts.map(async (post) => {
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

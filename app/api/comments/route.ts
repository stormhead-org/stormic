import { prisma } from '@/prisma/prisma-client'
import { Comment } from '@prisma/client'
import { NextResponse } from 'next/server'

// Количество комментариев на страницу
const MESSAGES_BATCH = 40

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const cursor = searchParams.get('cursor')
		
		let allComments: Comment[] = []
		
		// Запрашиваем все комментарии с пагинацией
		if (cursor) {
			// Если курсор есть, используем его для запроса
			allComments = await prisma.comment.findMany({
				where: {
					publication_date: {
						gt: new Date(cursor) // Фильтруем по дате публикации больше курсора
					}
				},
				include: {
					author: {
						select: {
							id: true,
							fullName: true,
							role: true,
							profile_banner: true,
							profile_picture: true,
							bio: true
						}
					},
					post: {
						select: {
							title: true
						}
					}
				},
				orderBy: {
					publication_date: 'desc' // Сортируем по дате публикации
				},
				take: MESSAGES_BATCH // Ограничиваем количество возвращаемых комментариев
			})
		} else {
			// Если курсор отсутствует, запрашиваем первые 40 комментариев
			allComments = await prisma.comment.findMany({
				include: {
					author: {
						select: {
							id: true,
							fullName: true,
							role: true,
							profile_banner: true,
							profile_picture: true,
							bio: true
						}
					},
					post: {
						select: {
							title: true
						}
					}
				},
				orderBy: {
					publication_date: 'desc' // Сортируем по дате публикации
				},
				take: MESSAGES_BATCH // Ограничиваем количество возвращаемых комментариев
			})
		}
		
		// Преобразуем комментарии, поднимая информацию об авторе и посте на уровень выше
		const formattedComments = allComments.map((comment: any) => ({
			comment_id: comment.comment_id,
			postTitle: comment.post.title,
			post_id: comment.post_id,
			author_id: comment.author_id,
			author_fullName: comment.author.fullName,
			author_profile_picture: comment.author.profile_picture,
			content: comment.content,
			fileUrl: comment.fileUrl,
			deleted: comment.deleted,
			publication_date: comment.publication_date,
			update_date: comment.update_date,
			parent_comment_id: comment.parent_comment_id,
			likes_count: comment.likes_count
		}))
		
		// Определяем следующий курсор для пагинации
		let nextCursor = null
		if (formattedComments.length === MESSAGES_BATCH) {
			nextCursor = formattedComments[MESSAGES_BATCH - 1].publication_date.toISOString() // Используем дату публикации как курсор
		}
		
		return NextResponse.json({
			items: formattedComments, // Возвращаем преобразованные комментарии
			nextCursor
		})
	} catch (error) {
		console.log('GET_ALL_COMMENTS', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

// Указание, что этот маршрут не должен быть статическим
export const dynamic = 'force-dynamic'

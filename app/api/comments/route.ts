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
		
		// Определяем следующий курсор для пагинации
		let nextCursor = null
		if (allComments.length === MESSAGES_BATCH) {
			nextCursor = allComments[MESSAGES_BATCH - 1].publication_date.toISOString() // Используем дату публикации как курсор
		}
		
		return NextResponse.json({
			items: allComments, // Возвращаем все комментарии без иерархии
			nextCursor
		})
	} catch (error) {
		console.log('GET_ALL_COMMENTS', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

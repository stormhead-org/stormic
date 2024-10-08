import { prisma } from '@/prisma/prisma-client'
import { Comment } from '@prisma/client'
import { NextResponse } from 'next/server'

const MESSAGES_BATCH = 40

// Функция для организации комментариев в иерархическую структуру
const buildCommentTree = (comments: Comment[]) => {
	const map = new Map<number, Comment & { children: Comment[] }>()
	const roots: (Comment & { children: Comment[] })[] = []
	
	// Инициализируем карту и добавляем каждому комментарию массив для детей
	comments.forEach((comment) => {
		map.set(comment.comment_id, { ...comment, children: [] })
	})
	
	comments.forEach((comment) => {
		if (comment.parent_comment_id) {
			const parent = map.get(comment.parent_comment_id)
			if (parent) {
				parent.children.push(map.get(comment.comment_id)!)
			}
		} else {
			roots.push(map.get(comment.comment_id)!)
		}
	})
	
	return roots
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const cursor = searchParams.get('cursor')
		const url = new URL(req.url)
		const postId = Number(url.pathname.split('/')[3])
		
		if (!postId) {
			return new NextResponse('Post ID не найден', { status: 400 })
		}
		
		let allComments: Comment[] = []
		
		// Запрашиваем комментарии поста с пагинацией
		if (cursor) {
			// Если курсор есть, используем его для запроса
			allComments = await prisma.comment.findMany({
				where: {
					post_id: postId,
					publication_date: {
						gt: new Date(cursor) // Фильтруем по дате публикации больше курсора
					}
				},
				include: {
					author: true
				},
				orderBy: {
					publication_date: 'asc'
				},
				take: MESSAGES_BATCH // Ограничиваем количество возвращаемых комментариев
			})
		} else {
			// Если курсор отсутствует, запрашиваем первые 40 комментариев
			allComments = await prisma.comment.findMany({
				where: {
					post_id: postId
				},
				include: {
					author: true
				},
				orderBy: {
					publication_date: 'asc'
				},
				take: MESSAGES_BATCH // Ограничиваем количество возвращаемых комментариев
			})
		}
		
		// Строим дерево комментариев
		const commentTree = buildCommentTree(allComments)
		
		// Определяем следующий курсор для пагинации
		let nextCursor = null
		if (allComments.length === MESSAGES_BATCH) {
			nextCursor = allComments[MESSAGES_BATCH - 1].publication_date.toISOString() // Используем дату публикации как курсор
		}
		
		return NextResponse.json({
			items: commentTree,
			nextCursor
		})
	} catch (error) {
		console.log('[MESSAGES_GET]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

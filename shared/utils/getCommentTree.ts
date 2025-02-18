import type { Comment } from '@/payload-types'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

// Функция для организации комментариев в иерархическую структуру
const buildCommentTree = (comments: Comment[]) => {
	const map = new Map<number, Comment & { childrenComments: Comment[] }>()
	const roots: (Comment & { childrenComments: Comment[] })[] = []

	// Инициализируем карту: для каждого комментария создаём поле childrenComments как пустой массив
	comments.forEach(comment => {
		map.set(comment.id, { ...comment, childrenComments: [] })
	})

	// Заполняем дерево: если есть parentComment, добавляем комментарий в массив детей родителя,
	// иначе добавляем в корневой массив
	comments.forEach(comment => {
		if (comment.parentComment) {
			const parentId =
				typeof comment.parentComment === 'number'
					? comment.parentComment
					: comment.parentComment.id

			const parent = map.get(parentId)
			if (parent) {
				parent.childrenComments.push(map.get(comment.id)!)
			}
		} else {
			roots.push(map.get(comment.id)!)
		}
	})

	return roots
}

export const getCommentTree = async (postId: number) => {
	const payload = await getPayload({ config: configPromise })
	try {
		if (!postId) {
			return new NextResponse('Post ID не найден', { status: 400 })
		}

		const allComments = await payload.find({
			collection: 'comments',
			depth: 10, // Запрашиваем достаточно уровней вложенности
			page: 1,
			limit: 40,
			pagination: false,
			where: {
				parentPost: {
					equals: postId
				}
			},
			sort: 'createdAt',
			fallbackLocale: false,
			overrideAccess: false,
			showHiddenFields: true
		})

		// Преобразуем структуру данных
		const commentsWithChildren = allComments.docs.map(comment => ({
			...comment,
			childrenComments: (comment.childrenComments?.docs || [])
				.map(childId => allComments.docs.find(c => c.id === childId))
				.filter((child): child is Comment => Boolean(child)) // Удаляем null или undefined
		}))

		const commentTree = buildCommentTree(commentsWithChildren)
		return NextResponse.json({
			items: commentTree,
			hasNextPage: allComments.hasNextPage,
			hasPrevPage: allComments.hasPrevPage,
			totalPages: allComments.totalPages,
			totalDocs: allComments.totalDocs
		})
	} catch (error) {
		console.error('[GET_COMMENT_TREE]', error)
		throw error
	}
}

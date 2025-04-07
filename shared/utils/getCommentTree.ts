import type { Community, Media, Post, User } from '@/payload-types'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

interface CommentWithChildren {
	id: string
	parentPost: string | Post
	community: string | Community
	author: string | User
	content: string
	media?: string | Media | null
	hasDeleted?: boolean | null
	parentComment?: string | CommentWithChildren | null
	childrenComments: CommentWithChildren[]
	likes?: (string | User)[] | null
	updatedAt: string
	createdAt: string
}

const buildCommentTree = (
	comments: CommentWithChildren[]
): CommentWithChildren[] => {
	const map = new Map<string, CommentWithChildren>()
	const roots: CommentWithChildren[] = []

	comments.forEach(comment => {
		map.set(comment.id, { ...comment, childrenComments: [] })
	})

	comments.forEach(comment => {
		if (comment.parentComment) {
			const parentId =
				typeof comment.parentComment === 'string'
					? comment.parentComment
					: comment.parentComment?.id
			const parent = map.get(parentId)
			if (parent) {
				parent.childrenComments.push(map.get(comment.id)!)
			}
		} else {
			roots.push(map.get(comment.id)!)
		}
	})

	map.forEach(comment => {
		if (comment.childrenComments.length) {
			comment.childrenComments.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
		}
	})

	return roots
}

export const getCommentTree = async (postId: string) => {
	const payload = await getPayload({ config: configPromise })
	try {
		if (!postId) {
			return new NextResponse('Post ID не найден', { status: 400 })
		}

		const allComments = await payload.find({
			collection: 'comments',
			depth: 10,
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

		const commentsWithChildren: CommentWithChildren[] = allComments.docs.map(
			(comment: any) => ({
				id: comment.id,
				parentPost: comment.parentPost,
				community: comment.community,
				author: comment.author,
				content: comment.content,
				media: comment.media || null,
				hasDeleted: comment.hasDeleted || null,
				parentComment: comment.parentComment || null,
				childrenComments: [],
				likes: comment.likes || null,
				updatedAt: comment.updatedAt,
				createdAt: comment.createdAt
			})
		)

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

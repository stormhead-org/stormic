import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
import { getCommentStatus } from '@/shared/utils/api/comments/getCommentStatus'
import { likeComment } from '@/shared/utils/api/comments/likeComment'
import { unlikeComment } from '@/shared/utils/api/comments/unlikeComment'
import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
	slug: 'comments',
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated
	},
	endpoints: [
		{
			path: '/:id/like',
			method: 'post',
			handler: async req => {
				try {
					const result = await likeComment(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error('Error while processing like:', error)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid Comment Id is required'
					) {
						return Response.json(
							{ error: 'Valid Comment Id is required' },
							{ status: 400 }
						)
					}

					return Response.json({ error: 'Failed to like' }, { status: 500 })
				}
			}
		},
		{
			path: '/:id/unlike',
			method: 'post',
			handler: async req => {
				try {
					const result = await unlikeComment(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error('Error while processing unlike:', error)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid Comment Id is required'
					) {
						return Response.json(
							{ error: 'Valid Comment Id is required' },
							{ status: 400 }
						)
					}

					return Response.json({ error: 'Failed to unlike' }, { status: 500 })
				}
			}
		},
		{
			path: '/:id/status',
			method: 'get',
			handler: async req => {
				if (!req.routeParams || !req.routeParams.id) {
					return Response.json(
						{ error: 'Comment ID is missing' },
						{ status: 400 }
					)
				}
				const commentId = req.routeParams.id as string
				try {
					const status = await getCommentStatus(commentId, req)
					if (!status) {
						return Response.json(
							{ error: 'Comment not found' },
							{ status: 404 }
						)
					}
					return Response.json(status)
				} catch (error) {
					return Response.json(
						{ error: 'Something went wrong' },
						{ status: 500 }
					)
				}
			}
		}
	],
	fields: [
		{
			label: 'Родительский пост',
			name: 'parentPost',
			type: 'relationship',
			hasMany: false,
			relationTo: 'posts',
			required: true
		},
		{
			label: 'Сообщество',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		},
		{
			label: 'Автор комментария',
			name: 'author',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'Текст комментария',
			name: 'content',
			type: 'textarea',
			required: true
		},
		{
			label: 'Медиа',
			name: 'media',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Комментарий удален?',
			name: 'hasDeleted',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Комментарий обновлен?',
			name: 'hasUpdated',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Родительский комментарий',
			name: 'parentComment',
			type: 'relationship',
			hasMany: false,
			relationTo: 'comments',
			required: false
		},
		{
			label: 'Дочерние комментарии',
			name: 'childrenComments',
			type: 'join',
			collection: 'comments',
			on: 'parentComment',
			maxDepth: 1,
			required: false
		},
		{
			label: 'Лайки',
			name: 'likes',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users',
			required: false
		}
	]
}

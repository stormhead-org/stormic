import { authenticated } from '@/modules/access/authenticated'
import { authenticatedOrPublished } from '@/modules/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/shared/lib/generatePreviewPath'
import { addBookmark } from '@/shared/utils/api/bookmarks/addBookmark'
import { getBookmarkStatus } from '@/shared/utils/api/bookmarks/getBookmarkStatus'
import { removeBookmark } from '@/shared/utils/api/bookmarks/removeBookmark'
import { getPostStatus } from '@/shared/utils/api/posts/getPostStatus'
import { likePost } from '@/shared/utils/api/posts/likePost'
import { unlikePost } from '@/shared/utils/api/posts/unlikePost'
import { getCommentTree } from '@/shared/utils/getCommentTree'
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField
} from '@payloadcms/plugin-seo/fields'
import type { CollectionConfig } from 'payload'
import { revalidateDelete } from './hooks/revalidatePost'

export const Posts: CollectionConfig<'posts'> = {
	slug: 'posts',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated
	},
	defaultPopulate: {
		title: true,
		heroImage: true,
		content: true,
		relatedPost: true,
		community: true,
		author: true,
		createdAt: true,
		meta: {
			image: true,
			description: true
		}
	},
	admin: {
		defaultColumns: ['title', 'updatedAt'],
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					id: typeof data?.id === 'number' ? data.id : null,
					collection: 'posts',
					req
				})

				return path
			}
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				id: typeof data?.id === 'number' ? data.id : null,
				collection: 'posts',
				req
			}),
		useAsTitle: 'title'
	},
	endpoints: [
		{
			path: '/:id/comments',
			method: 'get',
			handler: async req => {
				try {
					if (!req.routeParams || !req.routeParams.id) {
						return Response.json(
							{ error: 'Post ID не найден' },
							{ status: 400 }
						)
					}

					const postId = Number(req.routeParams.id)

					const commentTree = await getCommentTree(postId)
					return commentTree
				} catch (error) {
					console.error('[CUSTOM_ENDPOINT]', error)
					return Response.json(
						{ error: 'Ошибка сервера при получении комментариев к посту' },
						{ status: 500 }
					)
				}
			}
		},
		{
			path: '/:id/status',
			method: 'get',
			handler: async req => {
				if (!req.routeParams || !req.routeParams.id) {
					return Response.json({ error: 'Post ID is missing' }, { status: 400 })
				}
				const postId = req.routeParams.id as string
				try {
					const status = await getPostStatus(postId, req)
					if (!status) {
						return Response.json({ error: 'Post not found' }, { status: 404 })
					}
					console.log(status)
					return Response.json(status)
				} catch (error) {
					return Response.json(
						{ error: 'Something went wrong' },
						{ status: 500 }
					)
				}
			}
		},
		{
			path: '/:id/like',
			method: 'post',
			handler: async req => {
				try {
					const result = await likePost(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error('Error while processing like:', error)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid Post Id is required'
					) {
						return Response.json(
							{ error: 'Valid Post Id is required' },
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
					const result = await unlikePost(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error('Error while processing follow:', error)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid followingId is required'
					) {
						return Response.json(
							{ error: 'Valid followingId is required' },
							{ status: 400 }
						)
					}

					return Response.json({ error: 'Failed to unlike' }, { status: 500 })
				}
			}
		},
		{
			path: '/:id/bookmarks/status',
			method: 'get',
			handler: async req => {
				if (!req.routeParams || !req.routeParams.id) {
					return Response.json({ error: 'Post ID is missing' }, { status: 400 })
				}
				const postId = req.routeParams.id as string
				try {
					const status = await getBookmarkStatus(postId, req)
					if (!status) {
						return Response.json({ error: 'Post not found' }, { status: 404 })
					}
					console.log(status)
					return Response.json(status)
				} catch (error) {
					return Response.json(
						{ error: 'Something went wrong' },
						{ status: 500 }
					)
				}
			}
		},
		{
			path: '/:id/bookmarks/post',
			method: 'post',
			handler: async req => {
				try {
					const result = await addBookmark(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error(
						'Error while processing add bookmark:',
						error
					)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid Post Id is required'
					) {
						return Response.json(
							{ error: 'Valid Post Id is required' },
							{ status: 400 }
						)
					}

					return Response.json(
						{ error: 'Failed to add bookmark' },
						{ status: 500 }
					)
				}
			}
		},
		{
			path: '/:id/bookmarks/delete',
			method: 'post',
			handler: async req => {
				try {
					const result = await removeBookmark(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error(
						'Error while processing add bookmark:',
						error
					)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'User ID is required in path' ||
						error.message === 'Valid Post ID is required'
					) {
						return Response.json(
							{ error: 'Valid Post ID is required' },
							{ status: 400 }
						)
					}

					return Response.json(
						{ error: 'Failed to add bookmark' },
						{ status: 500 }
					)
				}
			}
		}
	],
	fields: [
		{
			label: 'Название',
			name: 'title',
			type: 'text',
			required: true
		},
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Content',
					fields: [
						{
							name: 'heroImage',
							type: 'upload',
							relationTo: 'media'
						},
						{
							name: 'content',
							type: 'json',
							label: false,
							required: true
						},
						// {
						// 	name: 'content',
						// 	type: 'richText',
						// 	editor: lexicalEditor({
						// 		features: ({ rootFeatures }) => {
						// 			return [
						// 				...rootFeatures,
						// 				HeadingFeature({
						// 					enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
						// 				}),
						// 				BlocksFeature({
						// 					blocks: [Banner, Code, MediaBlock]
						// 				}),
						// 				FixedToolbarFeature(),
						// 				InlineToolbarFeature(),
						// 				HorizontalRuleFeature()
						// 			]
						// 		}
						// 	}),
						// 	label: false,
						// 	required: true
						// },
						{
							label: 'Комментарии к посту',
							name: 'comments',
							type: 'join',
							collection: 'comments',
							on: 'parentPost',
							maxDepth: 1
						}
					]
				},
				{
					label: 'Meta',
					fields: [
						{
							name: 'relatedPost',
							type: 'relationship',
							admin: {
								position: 'sidebar'
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id]
									}
								}
							},
							hasMany: false,
							relationTo: 'posts'
						},
						{
							name: 'community',
							type: 'relationship',
							admin: {
								position: 'sidebar'
							},
							hasMany: false,
							relationTo: 'communities',
							required: true
						}
					]
				},
				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image'
						}),
						MetaTitleField({
							hasGenerateFn: true
						}),
						MetaImageField({
							relationTo: 'media'
						}),

						MetaDescriptionField({})
						// PreviewField({
						// 	// if the `generateUrl` function is configured
						// 	hasGenerateFn: true,

						// 	// field paths to match the target field for data
						// 	titlePath: 'meta.title',
						// 	descriptionPath: 'meta.description'
						// })
					]
				}
			]
		},
		{
			label: 'Автор',
			name: 'author',
			type: 'relationship',
			admin: {
				position: 'sidebar'
			},
			hasMany: false,
			relationTo: 'users'
		},
		{
			label: 'Лайки',
			name: 'likes',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			label: 'Закладки',
			name: 'bookmarks',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime'
				},
				position: 'sidebar'
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === 'published' && !value) {
							return new Date()
						}
						return value
					}
				]
			}
		}
	],
	hooks: {
		// afterChange: [revalidatePost],
		afterDelete: [revalidateDelete]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 500
			},
			schedulePublish: true
		},
		maxPerDoc: 50
	}
}

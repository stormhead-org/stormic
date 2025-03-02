import type { CollectionConfig } from 'payload'

import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
import { followUser } from '@/shared/utils/followUser'
import { getUserStatus } from '@/shared/utils/getUserStatus'
import { unfollowUser } from '@/shared/utils/unfollowUser'
import { userData } from './hooks/userData'

export const Users: CollectionConfig = {
	slug: 'users',
	// access: {
	// 	read: adminsAndUser,
	// 	create: anyone,
	// 	update: adminsAndUser,
	// 	delete: admins,
	// 	admin: ({ req: { user } }) => checkRole(['admin'], user),
	// },
	access: {
		admin: authenticated,
		create: anyone,
		read: authenticated,
		update: authenticated,
		delete: authenticated
	},
	admin: {
		defaultColumns: ['name', 'email'],
		useAsTitle: 'name'
	},
	auth: true,
	endpoints: [
		{
			path: '/:id/status',
			method: 'get',
			handler: async req => {
				if (!req.routeParams || !req.routeParams.id) {
					return Response.json({ error: 'User ID is missing' }, { status: 400 })
				}
				const userId = req.routeParams.id as string
				try {
					const status = await getUserStatus(userId, req)
					if (!status) {
						return Response.json({ error: 'User not found' }, { status: 404 })
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
			path: '/:id/follow',
			method: 'post',
			handler: async req => {
				try {
					const result = await followUser(req)
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

					return Response.json({ error: 'Failed to follow' }, { status: 500 })
				}
			}
		},
		{
			path: '/:id/unfollow',
			method: 'post',
			handler: async req => {
				try {
					const result = await unfollowUser(req)
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

					return Response.json({ error: 'Failed to unfollow' }, { status: 500 })
				}
			}
		}
	],
	fields: [
		{
			label: 'Имя',
			name: 'name',
			type: 'text',
			required: true
		},
		{
			label: 'Аватар',
			name: 'userAvatar',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Баннер профиля',
			name: 'userBanner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'О себе',
			name: 'userDescription',
			type: 'textarea'
		},
		{
			label: 'Таблица деталей',
			name: 'tableUserInfo',
			type: 'array',
			maxRows: 2,
			fields: [
				{
					type: 'row',
					fields: [
						{
							label: 'Название',
							name: 'label',
							type: 'text',
							required: true,
							admin: {
								width: '50%'
							}
						},
						{
							label: 'Значение',
							name: 'value',
							type: 'text',
							required: true,
							admin: {
								width: '50%'
							}
						}
					]
				}
			]
		},
		{
			label: 'Системные роли',
			name: 'systemRoles',
			type: 'select',
			hasMany: true,
			// hooks: {
			// 	beforeChange: [protectRoles]
			// },
			required: true,
			options: [
				{
					label: 'Основатель',
					value: 'owner'
				},
				{
					label: 'everyone',
					value: 'everyone'
				}
			]
		},
		{
			label: 'Роли',
			name: 'roles',
			type: 'relationship',
			hasMany: true,
			relationTo: 'roles'
			// required: true
		},
		{
			label: 'Посты пользователя',
			name: 'relatedPosts',
			type: 'join',
			collection: 'posts',
			defaultSort: '-title',
			on: 'owner',
			maxDepth: 1
		},
		// {
		// 	label: 'Комментарии пользователя',
		// 	name: 'relatedComments',
		// 	type: 'join',
		// 	collection: 'comments',
		// 	on: 'owner',
		// 	maxDepth: 1
		// },
		{
			label: 'Подписчики',
			name: 'followers',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			label: 'Подписки на пользователей',
			name: 'follow',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			label: 'Подписки на сообщества',
			name: 'followCommunities',
			type: 'join',
			collection: 'communities',
			on: 'followers',
			maxDepth: 1
		},
		{
			label: 'Администрируемые сообщества',
			name: 'ownerCommunities',
			type: 'join',
			collection: 'communities',
			on: 'owner',
			maxDepth: 1
		},
		{
			label: 'Модерируемые сообщества',
			name: 'moderationCommunities',
			type: 'join',
			collection: 'communities',
			on: 'systemArrayModerators',
			maxDepth: 1
		},
		{
			label: 'Лайки постов',
			name: 'postsLikes',
			type: 'join',
			collection: 'posts',
			on: 'likes',
			maxDepth: 1
		},
		{
			label: 'Лайки комментариев',
			name: 'commentsLikes',
			type: 'join',
			collection: 'comments',
			on: 'likes',
			maxDepth: 1
		},
		{
			label: 'Закладки',
			name: 'bookmarks',
			type: 'join',
			collection: 'posts',
			on: 'bookmarks',
			maxDepth: 1
		}
	],
	hooks: {
		afterRead: [userData]
	},
	timestamps: true
}

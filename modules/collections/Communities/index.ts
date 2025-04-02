import { followCommunity } from '@/shared/utils/api/communities/followCommunity'
import { unfollowCommunity } from '@/shared/utils/api/communities/unfollowCommunity'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
import { getCommunityStatus } from '@/shared/utils/api/communities/getCommunityStatus'

export const Communities: CollectionConfig = {
	slug: 'communities',
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated
	},
	admin: {
		useAsTitle: 'title'
	},
	endpoints: [
		{
			path: '/:id/status',
			method: 'get',
			handler: async req => {
				if (!req.routeParams || !req.routeParams.id) {
					return Response.json(
						{ error: 'Community ID is missing' },
						{ status: 400 }
					)
				}
				const communityId = req.routeParams.id as string
				try {
					const status = await getCommunityStatus(communityId, req)
					if (!status) {
						return Response.json(
							{ error: 'Community not found' },
							{ status: 404 }
						)
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
					const result = await followCommunity(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error(
						'Error while processing follow community:',
						error
					)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'Community ID is required in path' ||
						error.message === 'Valid following ID community is required'
					) {
						return Response.json(
							{ error: 'Valid following ID community is required' },
							{ status: 400 }
						)
					}

					return Response.json(
						{ error: 'Failed to follow community' },
						{ status: 500 }
					)
				}
			}
		},
		{
			path: '/:id/unfollow',
			method: 'post',
			handler: async req => {
				try {
					const result = await unfollowCommunity(req)
					return Response.json(result)
				} catch (error: any) {
					req.payload.logger.error(
						'Error while processing unfollow community:',
						error
					)

					if (error.message === 'Unauthorized') {
						return Response.json({ error: 'Unauthorized' }, { status: 401 })
					}
					if (
						error.message === 'Community ID is required in path' ||
						error.message === 'Valid following ID community is required'
					) {
						return Response.json(
							{ error: 'Valid following ID community is required' },
							{ status: 400 }
						)
					}

					return Response.json(
						{ error: 'Failed to unfollow community' },
						{ status: 500 }
					)
				}
			}
		}
	],
	fields: [
		{
			label: 'Логотип',
			name: 'logo',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Баннер',
			name: 'banner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Название сообщества',
			name: 'title',
			type: 'text',
			required: true
		},
		{
			label: 'E-mail для связи',
			name: 'contacts',
			type: 'text'
		},
		{
			label: 'Описание сообщества',
			name: 'description',
			type: 'textarea'
		},
		{
			label: 'Таблица деталей',
			name: 'tableInfo',
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
			label: 'Владелец сообщества',
			name: 'owner',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'Модераторы сообщества',
			name: 'moderators',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			label: 'Роли',
			name: 'roles',
			type: 'join',
			collection: 'roles',
			on: 'community',
			maxDepth: 1
		},
		{
			label: 'Правила',
			name: 'rules',
			type: 'array',
			fields: [
				{
					label: 'Название',
					name: 'communityNameRule',
					type: 'text'
				},
				{
					label: 'Описание',
					name: 'communityDescriptionRule',
					type: 'textarea'
				}
			]
		},
		{
			label: 'Подписчики сообщества',
			name: 'followers',
			type: 'join',
			collection: 'followCommunity',
			on: 'community',
			maxDepth: 1
		},
		{
			label: 'Заблокированные пользователи',
			name: 'bans',
			type: 'join',
			collection: 'communityUsersBans',
			on: 'user',
			maxDepth: 1
		},
		{
			label: 'Заглушенные пользователи',
			name: 'mutes',
			type: 'join',
			collection: 'communityUsersMutes',
			on: 'user',
			maxDepth: 1
		},
		{
			label: 'Посты в сообществе',
			name: 'posts',
			type: 'join',
			collection: 'posts',
			defaultSort: '-id',
			on: 'community',
			maxDepth: 1
		},
		{
			label: 'Комментарии в сообществе',
			name: 'comments',
			type: 'join',
			collection: 'comments',
			defaultSort: '-id',
			on: 'community',
			maxDepth: 1
		}
	]
}

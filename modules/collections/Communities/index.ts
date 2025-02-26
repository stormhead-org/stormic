import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
import { getCommunityStatus } from '@/shared/utils/getCommunityStatus'
import { communityModerators } from './hooks/communityModerators'

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
		}
	],
	fields: [
		{
			label: 'Логотип',
			name: 'communityLogo',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Баннер',
			name: 'communityBanner',
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
			name: 'communityContactEmail',
			type: 'text'
		},
		{
			label: 'Описание сообщества',
			name: 'communityDescription',
			type: 'textarea'
		},
		{
			label: 'Таблица деталей',
			name: 'tableCommunityInfo',
			type: 'array',
			maxRows: 3,
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
			relationTo: 'users'
		},
		{
			label: 'Модераторы сообщества',
			name: 'moderators',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			name: 'communityModerators',
			type: 'array',
			access: {
				update: () => false
			},
			admin: {
				disabled: true,
				readOnly: true
			},
			fields: [
				{
					name: 'id',
					type: 'text'
				},
				{
					name: 'name',
					type: 'text'
				},
				{
					name: 'authorAvatar',
					type: 'array',
					fields: [
						{
							name: 'url',
							type: 'text'
						}
					]
				}
			]
		},
		{
			label: 'Правила',
			name: 'communityRules',
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
			type: 'relationship',
			hasMany: true,
			relationTo: 'users'
		},
		{
			label: 'Посты в сообществе',
			name: 'relatedPosts',
			type: 'join',
			// admin: {
			// 	components: {
			// 		afterInput: ['/components/AfterInput.js#AfterInput'],
			// 		beforeInput: ['/components/BeforeInput.js#BeforeInput'],
			// 		Description:
			// 			'/components/CustomDescription/index.js#FieldDescriptionComponent',
			// 	},
			// },
			collection: 'posts',
			defaultSort: '-title',
			defaultLimit: 5,
			on: 'community',
			maxDepth: 1
		},
		{
			label: 'Комментарии в сообществе',
			name: 'relatedComments',
			type: 'join',
			collection: 'comments',
			on: 'community',
			maxDepth: 1
		},
		...slugField()
	],
	hooks: {
		afterRead: [communityModerators]
	}
}

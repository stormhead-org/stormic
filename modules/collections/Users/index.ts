import type { CollectionConfig } from 'payload'

import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
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
			on: 'moderators',
			maxDepth: 1
		}
	],
	hooks: {
		afterRead: [userData]
	},
	timestamps: true
}

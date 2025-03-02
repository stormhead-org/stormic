import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
	slug: 'roles',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	admin: {
		useAsTitle: 'name'
	},
	fields: [
		{
			label: 'Название',
			name: 'name',
			type: 'text',
			required: true
		},
		{
			label: 'Значок',
			name: 'badge',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Цвет роли',
			name: 'color',
			defaultValue: '#eeedf5',
			type: 'text'
		},
		{
			label: 'Пользователи с этой ролью',
			name: 'relatedUsers',
			type: 'join',
			collection: 'users',
			on: 'roles',
			maxDepth: 1
		},
		{
			label: 'Блокировать пользователей в сообществе',
			name: 'COMMUNITY_USER_BAN',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Удалять посты в сообществе',
			name: 'COMMUNITY_POST_DELETE',
			type: 'checkbox',
			defaultValue: false
		}
	]
	// hooks: {
	// 	afterRead: [moderators],
	// },
}

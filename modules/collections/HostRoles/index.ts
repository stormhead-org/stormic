import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const HostRoles: CollectionConfig = {
	slug: 'hostRoles',
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
			defaultValue: '#99AAB5',
			type: 'text'
		},
		{
			label: 'Пользователи с этой ролью',
			name: 'users',
			type: 'relationship',
			hasMany: true,
			relationTo: 'users',
			required: false
		},
		{
			label: 'Управление ролями',
			name: 'COMMUNITY_ROLES_MANAGEMENT',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Блокировать пользователей',
			name: 'HOST_USER_BAN',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Заглушать пользователей',
			name: 'HOST_USER_MUTE',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Удалять посты в сообществах',
			name: 'HOST_COMMUNITY_POST_DELETE',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Снять пост с публикации в сообществе',
			name: 'HOST_COMMUNITY_POST_REMOVE_FROM_PUBLICATION',
			type: 'checkbox',
			defaultValue: false
		},
		{
			label: 'Удалять комментарии в сообществе',
			name: 'HOST_COMMUNITY_COMMENTS_DELETE',
			type: 'checkbox',
			defaultValue: false
		}
	]
}

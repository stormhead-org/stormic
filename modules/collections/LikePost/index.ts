import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const LikePost: CollectionConfig = {
	slug: 'likePost',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Автор лайка',
			name: 'user',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'Пост с лайком',
			name: 'post',
			type: 'relationship',
			hasMany: false,
			relationTo: 'posts',
			required: true
		}
	]
}

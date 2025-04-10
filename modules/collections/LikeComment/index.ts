import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const LikeComment: CollectionConfig = {
	slug: 'likeComment',
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
			label: 'Коммент с лайком',
			name: 'comment',
			type: 'relationship',
			hasMany: false,
			relationTo: 'comments',
			required: true
		}
	]
}

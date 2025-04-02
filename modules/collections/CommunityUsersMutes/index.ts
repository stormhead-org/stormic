import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const CommunityUsersMutes: CollectionConfig = {
	slug: 'communityUsersMutes',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Заглушенный пользователь',
			name: 'user',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'Заглушен в сообществе',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		}
	]
}

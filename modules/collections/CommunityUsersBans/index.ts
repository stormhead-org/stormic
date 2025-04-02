import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const CommunityUsersBans: CollectionConfig = {
	slug: 'communityUsersBans',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Заблокированный пользователь',
			name: 'user',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'Заблокирован в сообществе',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		}
	]
}

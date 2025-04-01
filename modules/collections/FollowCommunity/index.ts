import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const FollowCommunity: CollectionConfig = {
	slug: 'followCommunity',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Подписавшийся пользователь',
			name: 'user',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: false
		},
		{
			label: 'Подписался на сообщество',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		}
	]
}

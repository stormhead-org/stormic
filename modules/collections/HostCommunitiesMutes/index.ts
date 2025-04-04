import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const HostCommunitiesMutes: CollectionConfig = {
	slug: 'hostCommunitiesMutes',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Заглушенное сообщество',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		}
	]
}

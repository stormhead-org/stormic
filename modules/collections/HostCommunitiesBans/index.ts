import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const HostCommunitiesBans: CollectionConfig = {
	slug: 'hostCommunitiesBans',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated
	},
	fields: [
		{
			label: 'Заблокированное сообщество',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		}
	]
}

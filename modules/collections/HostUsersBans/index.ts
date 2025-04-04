import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const HostUsersBans: CollectionConfig = {
	slug: 'hostUsersBans',
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
		}
	]
}

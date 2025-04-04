import { authenticated } from '@/modules/access/authenticated'
import type { CollectionConfig } from 'payload'

export const HostUsersMutes: CollectionConfig = {
	slug: 'hostUsersMutes',
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
		}
	]
}

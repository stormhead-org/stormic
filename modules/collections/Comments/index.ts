import type { CollectionConfig } from 'payload'
import { anyone } from '@/modules/access/anyone'
import { authenticated } from '@/modules/access/authenticated'
import { Author } from './hooks/author'

export const Comments: CollectionConfig = {
	slug: 'comments',
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated
	},
	// admin: {
	// 	useAsTitle: 'content'
	// },
	fields: [
		{
			label: 'Родительский пост',
			name: 'parentPost',
			type: 'relationship',
			hasMany: false,
			relationTo: 'posts',
			required: true
		},
		{
			label: 'Сообщество',
			name: 'community',
			type: 'relationship',
			hasMany: false,
			relationTo: 'communities',
			required: true
		},
		{
			label: 'Автор комментария',
			name: 'owner',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			name: 'author',
			type: 'text',
			access: {
				update: () => false
			},
			admin: {
				disabled: true,
				readOnly: true
			}
		},
		{
			label: 'Текст комментария',
			name: 'content',
			type: 'textarea',
			required: true
		},
		{
			label: 'Медиа',
			name: 'commentMedia',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Родительский комментарий',
			name: 'parentComment',
			type: 'relationship',
			hasMany: false,
			relationTo: 'comments',
			required: false
		},
		{
			label: 'Дочерние комментарии',
			name: 'childrenComments',
			type: 'join',
			collection: 'comments',
			on: 'parentComment',
			maxDepth: 1,
			required: false
		}
	],
	hooks: {
		afterRead: [Author]
	}
}

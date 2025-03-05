import { GlobalConfig } from 'payload'
import { ownerUser } from './hooks/ownerUser'

export const HostSettings: GlobalConfig = {
	label: 'Настройки инстанса',
	slug: 'host-settings',
	fields: [
		{
			label: 'Название инстанса',
			name: 'hostTitle',
			type: 'text'
		},
		{
			label: 'Слоган инстанса',
			name: 'hostSlogan',
			type: 'text'
		},
		{
			label: 'Логотип',
			name: 'hostLogo',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Основной баннер',
			name: 'hostBanner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Баннер окна авторизации',
			name: 'hostAuthBanner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Управляющий',
			name: 'owner',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users'
		},
		{
			label: 'E-mail для связи',
			name: 'contactEmail',
			type: 'text'
		},
		{
			label: 'Описание инстанса',
			name: 'hostDescription',
			type: 'textarea'
		},
		{
			label: 'Правила',
			name: 'rules',
			type: 'array',
			// required: true,
			fields: [
				{
					label: 'Название',
					name: 'nameRule',
					type: 'text'
				},
				{
					label: 'Описание',
					name: 'descriptionRule',
					type: 'textarea'
				}
			]
		},
		{
			name: 'hostOwner',
			type: 'array',
			access: {
				update: () => false
			},
			admin: {
				disabled: true,
				readOnly: true
			},
			fields: [
				{
					name: 'id',
					type: 'text'
				},
				{
					name: 'name',
					type: 'text'
				},
				{
					name: 'userDescription',
					type: 'text'
				},
				{
					name: 'userAvatar',
					type: 'array',
					fields: [
						{
							name: 'url',
							type: 'text'
						}
					]
				}
			]
		}
	],
	hooks: {
		afterRead: [ownerUser]
	}
}

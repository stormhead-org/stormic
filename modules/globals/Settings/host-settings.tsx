import { GlobalConfig } from 'payload'

export const HostSettings: GlobalConfig = {
	label: 'Настройки инстанса',
	slug: 'host-settings',
	fields: [
		{
			label: 'Название инстанса',
			name: 'title',
			type: 'text'
		},
		{
			label: 'Слоган инстанса',
			name: 'slogan',
			type: 'text'
		},
		{
			label: 'Логотип',
			name: 'logo',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Основной баннер',
			name: 'banner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Баннер окна авторизации',
			name: 'authBanner',
			type: 'upload',
			relationTo: 'media'
		},
		{
			label: 'Управляющий',
			name: 'owner',
			type: 'relationship',
			hasMany: false,
			relationTo: 'users',
			required: true
		},
		{
			label: 'E-mail для связи',
			name: 'contacts',
			type: 'text'
		},
		{
			label: 'Описание инстанса',
			name: 'description',
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
			label: 'Первая настройка',
			name: 'FIRST_SETTNGS',
			type: 'checkbox',
			defaultValue: true
		}
		// {
		// 	name: 'hostOwner',
		// 	type: 'array',
		// 	access: {
		// 		update: () => false
		// 	},
		// 	admin: {
		// 		disabled: true,
		// 		readOnly: true
		// 	},
		// 	fields: [
		// 		{
		// 			name: 'id',
		// 			type: 'text'
		// 		},
		// 		{
		// 			name: 'name',
		// 			type: 'text'
		// 		},
		// 		{
		// 			name: 'userDescription',
		// 			type: 'text'
		// 		},
		// 		{
		// 			name: 'userAvatar',
		// 			type: 'array',
		// 			fields: [
		// 				{
		// 					name: 'url',
		// 					type: 'text'
		// 				}
		// 			]
		// 		}
		// 	]
		// }
	]
	// hooks: {
	// 	afterRead: [ownerUser]
	// }
}

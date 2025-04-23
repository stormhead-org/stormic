import { GlobalConfig } from 'payload'

export const SocialNavigation: GlobalConfig = {
	label: 'Социальные сети',
	slug: 'social-navigation',
	fields: [
		{
			label: 'Twitter',
			name: 'twitter',
			type: 'text',
			required: false
		},
		{
			label: 'Mastodon',
			name: 'mastodon',
			type: 'text',
			required: false
		},
		{
			label: 'GitHub',
			name: 'github',
			type: 'text',
			required: false
		},
		{
			label: 'Instagram',
			name: 'instagram',
			type: 'text',
			required: false
		},
		{
			label: 'Site',
			name: 'site',
			type: 'text',
			required: false
		}
	]
}

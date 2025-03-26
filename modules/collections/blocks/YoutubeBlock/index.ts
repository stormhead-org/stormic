import { YouTubeBlockComponent } from './Component'

export const YouTubeBlock = {
	slug: 'youtube',
	labels: {
		singular: 'YouTube',
		plural: 'YouTube Videos'
	},
	fields: [
		{
			name: 'videoID',
			type: 'text',
			required: true
		}
	],
	admin: {
		components: {
			Block: YouTubeBlockComponent
		}
	}
}

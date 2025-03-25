// YouTubeFeature.ts
import {
	createServerFeature,
	type ResolvedServerFeatureMap,
	type SanitizedConfig,
	type ServerEditorConfig,
	type ServerFeature,
	type ServerFeatureProviderMap
} from '@payloadcms/richtext-lexical'
import { YouTubeNode } from '../nodes/YouTubeNode' // Укажите правильный путь к вашему узлу

export const YouTubeFeature = createServerFeature({
	key: 'youtube',
	feature: (_props: {
		config: SanitizedConfig
		featureProviderMap: ServerFeatureProviderMap
		isRoot?: boolean
		parentIsLocalized: boolean
		props: undefined
		resolvedFeatures: ResolvedServerFeatureMap
		unSanitizedEditorConfig: ServerEditorConfig
	}): ServerFeature<undefined, undefined> => {
		return {
			server: {
				nodes: [YouTubeNode],
				converters: {
					html: {
						converter: ({ node }: { node: YouTubeNode }) =>
							`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${node.getId()}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
						nodeTypes: [YouTubeNode.getType()]
					}
				}
			},
			client: {
				nodes: [YouTubeNode]
			},
			featureProps: undefined, // Добавляем, чтобы соответствовать интерфейсу ServerFeature
			resolvedFeatures: undefined, // Добавляем, чтобы соответствовать интерфейсу ServerFeature
			sanitizedConfig: undefined // Добавляем, чтобы соответствовать интерфейсу ServerFeature
		}
	}
})

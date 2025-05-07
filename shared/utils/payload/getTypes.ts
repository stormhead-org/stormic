import { Media } from '@/payload-types'

export function getMediaUrl(
	media: number | Media | null | undefined,
	size?: keyof NonNullable<Media['sizes']>,
	defaultUrl: string = ''
): string {
	// Если нет объекта media — сразу дефолт
	if (!media || typeof media !== 'object') {
		return defaultUrl
	}

	// Если запрошен конкретный размер и в media.sizes он есть
	if (size && media.sizes) {
		// Говорим TS, что sizes точно не null/undefined
		const sizes = media.sizes as NonNullable<Media['sizes']>
		const sized = sizes[size]
		// sized: { url?: string | null; ... } | undefined
		if (sized && sized.url) {
			return sized.url
		}
	}

	// Иначе возвращаем основной url, если он есть
	if (media.url) {
		return media.url
	}

	return defaultUrl
}

export function getRelationProp<T, K extends keyof T>(
	relation: number | T | null | undefined,
	prop: K,
	defaultValue: T[K]
): T[K] {
	if (relation && typeof relation === 'object' && prop in relation) {
		const value = (relation as T)[prop]
		return value !== null && value !== undefined ? value : defaultValue
	}
	return defaultValue
}

export function getRelationIds<T extends { id: number }>(
	items: (number | T)[] | undefined | null,
	defaultValue: number[] = []
): number[] {
	return (items || [])
		.filter((item): item is T => typeof item === 'object')
		.map(item => item.id)
}

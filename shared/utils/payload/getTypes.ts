import { Media } from '@/payload-types'

export function getMediaUrl(
	media: number | Media | null | undefined,
	defaultUrl: string = ''
): string {
	if (media && typeof media === 'object' && 'url' in media) {
		return media.url || defaultUrl
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

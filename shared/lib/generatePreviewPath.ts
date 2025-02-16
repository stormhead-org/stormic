import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	posts: '/p'
}

type Props = {
	collection: keyof typeof collectionPrefixMap
	id: number | null
	req: PayloadRequest
}

export const generatePreviewPath = ({ collection, id, req }: Props) => {
	const encodedParams = new URLSearchParams({
		id: String(id),
		collection,
		path: `${collectionPrefixMap[collection]}/${id}`,
		previewSecret: process.env.PREVIEW_SECRET || ''
	})

	const isProduction =
		process.env.NODE_ENV === 'production' ||
		Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)

	const protocol = isProduction ? 'https:' : req.protocol

	const url = `${protocol}//${
		req.host
	}/next/preview?${encodedParams.toString()}`

	return url
}

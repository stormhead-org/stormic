import type { CollectionAfterReadHook } from 'payload'

export const communityOwner: CollectionAfterReadHook = async ({
	doc,
	req,
	req: { payload }
}) => {
	if (doc?.owner) {
		const authorDoc = await payload.findByID({
			id: typeof doc.owner === 'object' ? doc.owner?.id : doc.owner,
			collection: 'users',
			depth: 1,
			req
		})

		if (authorDoc) {
			doc.communityOwner = {
				id: authorDoc.id,
				name: authorDoc.name,
				authorAvatar: authorDoc.avatar,
				userDescription: authorDoc.description
			}
		}
	}

	return doc
}

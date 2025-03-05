import type { GlobalAfterReadHook } from 'payload'

export const ownerUser: GlobalAfterReadHook = async ({
	doc,
	req,
	req: { payload }
}) => {
	if (doc?.owner) {
		const ownerId = typeof doc.owner === 'object' ? doc.owner?.id : doc.owner

		if (ownerId) {
			const ownerDoc = await payload.findByID({
				id: ownerId,
				collection: 'users',
				depth: 1,
				req
			})

			if (ownerDoc) {
				doc.hostOwner = {
					id: ownerDoc.id,
					name: ownerDoc.name,
					userDescription: ownerDoc.userDescription,
					userAvatar: ownerDoc.userAvatar
				}
			}
		}
	}

	return doc
}

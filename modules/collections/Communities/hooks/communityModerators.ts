import { User } from '@/payload-types'
import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `author` field to populate the user data, hidden from the admin UI
export const communityModerators: CollectionAfterReadHook = async ({
	doc,
	req,
	req: { payload },
}) => {
	if (doc?.moderators) {
		const moderatorDocs: User[] = []

		for (const moderator of doc.moderators) {
			const moderatorDoc = await payload.findByID({
				id: typeof moderator === 'object' ? moderator?.id : moderator,
				collection: 'users',
				depth: 1,
				req,
			})

			if (moderatorDoc) {
				moderatorDocs.push(moderatorDoc)
			}
		}

		doc.communityModerators = moderatorDocs.map(moderatorDoc => ({
			id: moderatorDoc.id,
			name: moderatorDoc.name,
			authorAvatar: moderatorDoc.userAvatar,
		}))
	}

	return doc
}

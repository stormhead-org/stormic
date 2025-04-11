import { User } from '@/payload-types'
import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `author` field to populate the user data, hidden from the admin UI
export const moderators: CollectionAfterReadHook = async ({
	doc,
	req,
	req: { payload }
}) => {
	if (doc?.systemArrayModerators) {
		const systemArrayModeratorsDocs: User[] = []

		for (const systemArrayModerator of doc.systemArrayModerators) {
			const systemArrayModeratorsDoc = await payload.findByID({
				id:
					typeof systemArrayModerator === 'object'
						? systemArrayModerator?.id
						: systemArrayModerator,
				collection: 'users',
				depth: 1,
				req
			})

			if (systemArrayModeratorsDoc) {
				systemArrayModeratorsDocs.push(systemArrayModeratorsDoc)
			}
		}

		doc.moderators = systemArrayModeratorsDocs.map(
			systemArrayModeratorsDoc => ({
				id: systemArrayModeratorsDoc.id,
				name: systemArrayModeratorsDoc.name,
				authorAvatar: systemArrayModeratorsDoc.avatar,
				userDescription: systemArrayModeratorsDoc.description
			})
		)
	}

	return doc
}

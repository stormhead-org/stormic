import type { CollectionAfterReadHook } from 'payload'

export const RelatedPost: CollectionAfterReadHook = async ({
	doc,
	req,
	req: { payload }
}) => {
	if (doc?.relatedPost) {
		const relatedPostDoc = await payload.findByID({
			id:
				typeof doc.relatedPost === 'object'
					? doc.relatedPost?.id
					: doc.relatedPost,
			collection: 'posts',
			depth: 1,
			req
		})

		if (relatedPostDoc) {
			doc.relatedPost = {
				id: relatedPostDoc.id,
				title: relatedPostDoc.title,
				content: relatedPostDoc.content,
				heroImage: relatedPostDoc.heroImage,
				community: relatedPostDoc.community,
				author: relatedPostDoc.author,
				publishedAt: relatedPostDoc.publishedAt
			}
		}
	}

	return doc
}

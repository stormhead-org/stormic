import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getBookmarkStatus = async (
	postId: string,
	req: PayloadRequest
): Promise<{ bookmarksCount: number; isAdded: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const postResult = await payload.find({
			collection: 'posts',
			where: {
				id: {
					equals: postId
				}
			},
			depth: 1
		})

		const post = postResult.docs[0]
		if (!post) {
			return null
		}
		
		const currentUser = req.user
		let isAdded = false
		
		if (currentUser) {
			const userId = currentUser.id as unknown as string;
			isAdded =
				Array.isArray(post.bookmarks) &&
				post.bookmarks.some((bookmark: any) =>
					typeof bookmark === 'string' ? bookmark === userId : bookmark.id === userId
				);
		}

		const bookmarksCount = Array.isArray(post.bookmarks) ? post.bookmarks.length : 0

		return {
			bookmarksCount,
			isAdded
		}
	} catch (error) {
		console.error('Error fetching post status:', error)
		throw error
	}
}

import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getPostStatus = async (
	postId: string,
	req: PayloadRequest
): Promise<{ likesCount: number; hasLiked: boolean } | null> => {
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
		let hasLiked = false

		if (currentUser) {
			const userId = currentUser.id as unknown as string
			hasLiked =
				Array.isArray(post.likes) &&
				post.likes.some((like: any) => {
					return typeof like === 'string' ? like === userId : like.id === userId
				})
		}

		const likesCount = Array.isArray(post.likes) ? post.likes.length : 0

		return {
			likesCount,
			hasLiked
		}
	} catch (error) {
		console.error('Error fetching post status:', error)
		throw error
	}
}

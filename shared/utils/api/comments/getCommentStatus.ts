import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getCommentStatus = async (
	commentId: string,
	req: PayloadRequest
): Promise<{ likesCount: number; hasLiked: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const commentResult = await payload.find({
			collection: 'comments',
			where: {
				id: {
					equals: commentId
				}
			},
			depth: 1
		})

		const comment = commentResult.docs[0]
		if (!comment) {
			return null
		}

		const user = req.user
		let hasLiked = false

		if (user) {
			// const userId = user.id as string
			const userId = user.id as unknown as string
			hasLiked =
				Array.isArray(comment.likes) &&
				comment.likes.some((like: any) => {
					return typeof like === 'string' ? like === userId : like.id === userId
				})
		}

		const likesCount = Array.isArray(comment.likes) ? comment.likes.length : 0

		return {
			likesCount,
			hasLiked
		}
	} catch (error) {
		console.error('Error fetching comment status:', error)
		throw error
	}
}

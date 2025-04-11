import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getCommentStatus = async (
	commentId: string,
	req: PayloadRequest
): Promise<{ likesCount: number; hasLiked: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const comment = await payload.findByID({
			collection: 'comments',
			id: commentId,
			overrideAccess: true,
			depth: 2
		})

		if (!comment) {
			return null
		}

		const currentUser = req.user
		let hasLiked = false

		// Получаем массив лайков из likeComment
		const likesDocs = await payload.find({
			collection: 'likeComment',
			depth: 2,
			pagination: false,
			where: {
				comment: {
					equals: commentId
				}
			},
			overrideAccess: true
		})

		const likes = await payload.count({
			collection: 'likeComment',
			where: {
				comment: {
					equals: commentId
				}
			},
			overrideAccess: true
		})

		if (currentUser) {
			const userId = currentUser.id

			// Проверяем, есть ли текущий пользователь среди тех, кто лайкнул коммент
			hasLiked = likesDocs.docs.some((like: any) => {
				return typeof like.user === 'object' && like.user.id === userId
			})
		}

		// Подсчитываем количество лайков
		const likesCount = likes.totalDocs

		return {
			likesCount,
			hasLiked
		}
	} catch (error) {
		console.error('Error fetching comment status:', error)
		throw error
	}
}

import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getPostStatus = async (
	postId: string,
	req: PayloadRequest
): Promise<{
	likesCount: number
	commentsCount: number
	isLiked: boolean
} | null> => {
	const payload = await getPayload({ config })

	try {
		const post = await payload.findByID({
			collection: 'posts',
			id: postId,
			overrideAccess: true,
			depth: 2
		})

		if (!post) {
			return null
		}

		const currentUser = req.user
		let isLiked = false

		// Получаем массив лайков из likePost
		const likesDocs = await payload.find({
			collection: 'likePost',
			depth: 2,
			pagination: false,
			where: {
				post: {
					equals: postId
				}
			},
			overrideAccess: true
		})

		const likes = await payload.count({
			collection: 'likePost',
			where: {
				post: {
					equals: postId
				}
			},
			overrideAccess: true
		})

		const comments = await payload.count({
			collection: 'comments',
			where: {
				parentPost: {
					equals: postId
				}
			},
			overrideAccess: true
		})

		if (currentUser) {
			const userId = currentUser.id

			// Проверяем, есть ли текущий пользователь среди тех, кто лайкнул пост
			isLiked = likesDocs.docs.some((like: any) => {
				return typeof like.user === 'object' && like.user.id === userId
			})
		}

		// Подсчитываем количество лайков
		const likesCount = likes.totalDocs

		// Подсчитываем количество коментов
		const commentsCount = comments.totalDocs

		return {
			likesCount,
			commentsCount,
			isLiked
		}
	} catch (error) {
		console.error('Error fetching post status:', error)
		throw error
	}
}

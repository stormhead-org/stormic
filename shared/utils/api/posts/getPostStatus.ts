import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getPostStatus = async (
	postId: string,
	req: PayloadRequest
): Promise<{ likesCount: number; isLiked: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const postResult = await payload.find({
			collection: 'posts',
			where: {
				id: {
					equals: postId
				}
			},
			depth: 1 // Загружаем связанные данные
		})

		const post = postResult.docs[0]
		if (!post) {
			return null
		}

		const currentUser = req.user
		let isLiked = false

		// Получаем массив лайков из likes.docs
		const likesDocs = post.likes?.docs || []

		if (currentUser) {
			const userId = currentUser.id
			// Проверяем, есть ли текущий пользователь среди тех, кто лайкнул пост
			isLiked = likesDocs.some((like: any) => like.user === userId)
		}

		// Подсчитываем количество лайков
		const likesCount = likesDocs.length

		return {
			likesCount,
			isLiked
		}
	} catch (error) {
		console.error('Error fetching post status:', error)
		throw error
	}
}

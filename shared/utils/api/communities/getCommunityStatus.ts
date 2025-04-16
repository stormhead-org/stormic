import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getCommunityStatus = async (
	communityId: string,
	req: PayloadRequest
): Promise<{
	followersCount: number
	postsCount: number
	isFollowing: boolean
} | null> => {
	const payload = await getPayload({ config })

	try {
		const community = await payload.findByID({
			collection: 'communities',
			id: communityId,
			depth: 1,
			overrideAccess: true
		})

		if (!community) {
			return null
		}

		const currentUser = req.user
		let isFollowing = false

		// Получаем массив подписок из followers.docs
		const followersDocs = community.followers?.docs || []

		// Получаем массив постов из posts.docs
		const postsDocs = community.posts?.docs || []

		if (currentUser) {
			const userId = currentUser.id
			// Проверяем, есть ли текущий пользователь среди подписчиков
			isFollowing = followersDocs.some((follow: any) => follow.user === userId)
		}

		// Подсчитываем количество подписчиков
		const followersCount = followersDocs.length

		// Подсчитываем количество постов
		const postsCount = postsDocs.length
		return {
			followersCount,
			postsCount,
			isFollowing
		}
	} catch (error) {
		console.error('Error fetching community status:', error)
		throw error
	}
}

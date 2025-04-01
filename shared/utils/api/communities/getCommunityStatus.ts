import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getCommunityStatus = async (
	communityId: string,
	req: PayloadRequest
): Promise<{ followersCount: number; isFollowing: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const communityResult = await payload.find({
			collection: 'communities',
			where: {
				id: {
					equals: communityId
				}
			},
			depth: 1 // Загружаем связанные данные
		})

		const community = communityResult.docs[0]
		if (!community) {
			return null
		}

		const currentUser = req.user
		let isFollowing = false

		// Получаем массив подписок из followers.docs
		const followersDocs = community.followers?.docs || []

		if (currentUser) {
			const userId = currentUser.id
			// Проверяем, есть ли текущий пользователь среди подписчиков
			isFollowing = followersDocs.some((follow: any) => follow.user === userId)
		}

		// Подсчитываем количество подписчиков
		const followersCount = followersDocs.length

		return {
			followersCount,
			isFollowing
		}
	} catch (error) {
		console.error('Error fetching community status:', error)
		throw error
	}
}

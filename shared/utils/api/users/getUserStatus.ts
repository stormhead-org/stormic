import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getUserStatus = async (
	userId: string,
	req: PayloadRequest
): Promise<{ followersCount: number; isFollowing: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const userResult = await payload.find({
			collection: 'users',
			where: {
				id: {
					equals: userId
				}
			},
			depth: 1
		})

		const user = userResult.docs[0]
		if (!user) {
			return null
		}

		const currentUser = req.user
		let isFollowing = false

		if (currentUser) {
			// const userId = user.id as string
			const userId = currentUser.id as unknown as string
			isFollowing =
				Array.isArray(user.followers) &&
				user.followers.some((follow: any) => {
					return typeof follow === 'string'
						? follow === userId
						: follow.id === userId
				})
		}

		const followersCount = Array.isArray(user.followers)
			? user.followers.length
			: 0

		return {
			followersCount,
			isFollowing
		}
	} catch (error) {
		console.error('Error fetching user status:', error)
		throw error
	}
}

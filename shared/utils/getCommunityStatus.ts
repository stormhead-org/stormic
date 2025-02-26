import config from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export const getCommunityStatus = async (
	communityId: string,
	req: PayloadRequest
): Promise<{ followersCount: number; hasFollowed: boolean } | null> => {
	const payload = await getPayload({ config })

	try {
		const communityResult = await payload.find({
			collection: 'communities',
			where: {
				id: {
					equals: communityId
				}
			},
			depth: 1
		})

		const community = communityResult.docs[0]
		if (!community) {
			return null
		}

		const currentUser = req.user
		let hasFollowed = false

		if (currentUser) {
			// const userId = user.id as string
			const userId = currentUser.id as unknown as string
			hasFollowed =
				Array.isArray(community.followers) &&
				community.followers.some((follow: any) => {
					return typeof follow === 'string'
						? follow === userId
						: follow.id === userId
				})
		}

		const followersCount = Array.isArray(community.followers)
			? community.followers.length
			: 0

		return {
			followersCount,
			hasFollowed
		}
	} catch (error) {
		console.error('Error fetching community status:', error)
		throw error
	}
}

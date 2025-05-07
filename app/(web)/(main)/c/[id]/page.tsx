import { Community, Post, User } from '@/payload-types'
import { CommunityBan } from '@/shared/components/info-blocks/community-ban'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { CommunityProfileGroup } from '@/shared/components/profiles/community-profile-group'
import { getSession } from '@/shared/lib/auth'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function CommunityPage({
	params: paramsPromise
}: PageProps) {
	const { id = null } = await paramsPromise

	if (!id) {
		return <CommunityNotFound />
	}

	try {
		const session = (await getSession()) as { user: User } | null
		const currentUser = session?.user
		const payload = await getPayload({ config: configPromise })

		const communityResult = await payload.findByID({
			collection: 'communities',
			id: id,
			overrideAccess: true
		})

		if (!communityResult) {
			return <CommunityNotFound />
		}

		const hostCommunityBan = await payload.find({
			collection: 'hostCommunitiesBans',
			where: {
				community: {
					equals: communityResult.id
				}
			},
			pagination: false,
			overrideAccess: true
		})

		const permissions = currentUser
			? await getUserPermissions(currentUser.id, communityResult.id)
			: null

		if (hostCommunityBan.docs.length !== 0) {
			return <CommunityBan />
		}

		const result = await payload.find({
			collection: 'posts',
			where: {
				_status: {
					equals: 'published'
				},
				hasDeleted: {
					equals: false
				},
				community: {
					equals: id
				}
			},
			pagination: false,
			overrideAccess: true,
			depth: 2
		})

		const resultCommunities = await payload.find({
			collection: 'communities',
			where: {
				COMMUNITY_HAS_BANNED: {
					equals: false
				}
			},
			pagination: false,
			overrideAccess: true
		})

		const posts = result.docs as Post[]
		const communities = resultCommunities.docs as Community[]

		const postPermissions: Record<number, Permissions | null> = {}
		if (currentUser) {
			await Promise.all(
				posts.map(async post => {
					const communityId =
						post.community && typeof post.community === 'object'
							? post.community.id
							: null
					postPermissions[post.id] = communityId
						? await getUserPermissions(currentUser.id, communityId)
						: null
				})
			)
		}

		return (
			<>
				<CommunityProfileGroup
					community={communityResult}
					permissions={permissions || null}
					posts={posts}
					currentUser={currentUser}
					communities={communities}
					postPermissions={postPermissions}
					className='mt-2'
				/>
			</>
		)
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error'
		console.error(`Error loading community: ${errorMessage}`)
		return <CommunityNotFound />
	}
}

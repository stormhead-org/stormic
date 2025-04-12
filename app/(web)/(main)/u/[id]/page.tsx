import { Community, Post, User } from '@/payload-types'
import { UserBan } from '@/shared/components/info-blocks/user-ban'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { UserProfileGroup } from '@/shared/components/profiles/user-profile-group'
import { getSession } from '@/shared/lib/auth'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function UserPage({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise
	const user = await queryUserById({ id })

	if (!user) {
		return <UserNotFound />
	}

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	const payload = await getPayload({ config: configPromise })

	const hostUserBan = await payload.find({
		collection: 'hostUsersBans',
		where: {
			user: {
				equals: id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	if (hostUserBan.docs.length !== 0) {
		return <UserBan />
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
			author: {
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
			<UserProfileGroup
				user={user}
				currentUser={currentUser !== null ? currentUser : undefined}
				posts={posts}
				communities={communities}
				postPermissions={postPermissions}
				className='mt-4'
			/>
		</>
	)
}

const queryUserById = cache(async ({ id }: { id: string | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const user = await payload.findByID({
		collection: 'users',
		id: id,
		depth: 2
	})

	return user || null
})

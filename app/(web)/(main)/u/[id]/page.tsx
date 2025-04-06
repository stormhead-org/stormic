import { Community, Post, User } from '@/payload-types'
import { UserBan } from '@/shared/components/info-blocks/user-ban'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { UserProfileGroup } from '@/shared/components/profiles/user-profile-group'
import { getSession } from '@/shared/lib/auth'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import { equal } from 'assert'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

type Args = {
	params: {
		id?: number
	}
}

export default async function UserPage({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { id = null } = await paramsPromise
	// const url = '/u/' + id
	const user = await queryUserById({ id })
	// const posts = await queryPostByUserId({ id })

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
				posts={posts}
				communities={communities}
				postPermissions={postPermissions}
				className='mt-4'
			/>
		</>
	)
}

export async function generateMetadata({
	params: paramsPromise
}: Args): Promise<Metadata> {
	const { id = null } = await paramsPromise
	const user = await queryUserById({ id })

	return generateMeta({ doc: user })
}

const queryUserById = cache(async ({ id }: { id: number | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const user = await payload.findByID({
		collection: 'users',
		id: id,
		depth: 1
	})

	return user || null
})

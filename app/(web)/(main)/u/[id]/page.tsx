import { User } from '@/payload-types'
import { UserBan } from '@/shared/components/info-blocks/user-ban'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { UserProfileGroup } from '@/shared/components/profiles/user-profile-group'
import { getSession } from '@/shared/lib/auth'
import { generateMeta } from '@/shared/lib/generateMeta'
import configPromise from '@payload-config'
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

	return (
		<>
			<UserProfileGroup
				//  posts={posts || []}
				user={user}
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

// const queryPostByUserId = cache(async ({ id }: { id: number | null }) => {
// 	if (!id) return null

// 	const { isEnabled: draft } = await draftMode()

// 	const payload = await getPayload({ config: configPromise })

// 	const result = await payload.find({
// 		collection: 'posts',
// 		draft,
// 		overrideAccess: draft,
// 		pagination: false,
// 		where: {
// 			author: {
// 				some: {
// 					id: {
// 						equals: id
// 					}
// 				}
// 			}
// 		} as any
// 	})

// 	return result.docs || null
// })

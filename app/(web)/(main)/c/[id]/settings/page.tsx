import { User } from '@/payload-types'
import { CommunitySettings } from '@/shared/components/communities/community-settings'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
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

export default async function Community({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { id = null } = await paramsPromise
	// const url = '/c/' + id
	const community = await queryCommunityById({ id })
	// const posts = await queryPostByCommunityId({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	return (
		<>
			<CommunitySettings data={community} />
		</>
	)
}

export async function generateMetadata({
	params: paramsPromise
}: Args): Promise<Metadata> {
	const { id = null } = await paramsPromise
	const community = await queryCommunityById({ id })

	return generateMeta({ doc: community })
}

const queryCommunityById = cache(async ({ id }: { id: number | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: id,
		depth: 2
	})

	return community || null
})

// const queryPostByCommunityId = cache(async ({ id }: { id: number | null }) => {
// 	if (!id) return null
//
// 	const { isEnabled: draft } = await draftMode()
//
// 	const payload = await getPayload({ config: configPromise })
//
// 	const result = await payload.find({
// 		collection: 'posts',
// 		draft,
// 		overrideAccess: draft,
// 		pagination: false,
// 		where: {
// 			community: {
// 				some: {
// 					id: {
// 						equals: id
// 					}
// 				}
// 			}
// 		} as any
// 	})
//
// 	return result.docs || null
// })

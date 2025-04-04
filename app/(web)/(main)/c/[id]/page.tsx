import { User } from '@/payload-types'
import { CommunityBan } from '@/shared/components/info-blocks/community-ban'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { CommunityProfileGroup } from '@/shared/components/profiles/community-profile-group'
import { getSession } from '@/shared/lib/auth'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { cache } from 'react'

type Args = {
	params: {
		id?: number
	}
}

export default async function Community({ params: paramsPromise }: Args) {
	const { id = null } = await paramsPromise
	const community = await queryCommunityById({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	const session = (await getSession()) as { user: User } | null
	const currentUser = session?.user
	const payload = await getPayload({ config: configPromise })

	const hostCommunityBan = await payload.find({
		collection: 'hostCommunitiesBans',
		where: {
			community: {
				equals: community.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const permissions = currentUser
		? await getUserPermissions(currentUser.id, community.id)
		: null

	if (hostCommunityBan.docs.length !== 0) {
		return <CommunityBan />
	}

	return (
		<>
			<CommunityProfileGroup
				community={community}
				permissions={permissions || null}
			/>
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

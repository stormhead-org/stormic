import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { SettingsCommunityMutesGroup } from '@/shared/components/profiles/settings/community/permissions/mutes/settings-community-mutes-group'
import { SettingsCommunityPermissionsTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

type Args = {
	params: {
		id?: number
	}
}

export default async function CommunityPermissionsSettings({
	params: paramsPromise
}: Args) {
	const { id = null } = await paramsPromise
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	const payload = await getPayload({ config: configPromise })

	if (!currentUser) {
		return redirect('/')
	}

	const community = await queryCommunityById({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	const communityUsers = await payload.find({
		collection: 'followCommunity',
		where: {
			community: {
				equals: community.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const communityUsersMutes = await payload.find({
		collection: 'communityUsersMutes',
		where: {
			community: {
				equals: community.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	return (
		<>
			<SettingsCommunityPermissionsTopMenu communityId={community.id} />
			<SettingsCommunityMutesGroup
				data={community}
				currentUser={currentUser}
				communityUsers={communityUsers.docs}
				communityUsersMutes={communityUsersMutes.docs}
			/>
		</>
	)
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

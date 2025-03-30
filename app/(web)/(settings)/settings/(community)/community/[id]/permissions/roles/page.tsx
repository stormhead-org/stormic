import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { SettingsCommunityPermissionsRolesGroup } from '@/shared/components/profiles/settings/community/permissions/settings-community-permissions-roles-group'
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

	const totalRoles = await payload.count({
		collection: 'roles',
		where: {
			community: {
				equals: community.id
			}
		},
		overrideAccess: true
	})

	return (
		<>
			<SettingsCommunityPermissionsTopMenu communityId={community.id} />
			<SettingsCommunityPermissionsRolesGroup
				data={community}
				totalRoles={totalRoles.totalDocs - 1}
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

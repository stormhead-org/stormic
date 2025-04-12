import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { SettingsCommunityPermissionsRolesGroup } from '@/shared/components/profiles/settings/community/permissions/roles/settings-community-permissions-roles-group'
import { SettingsCommunityPermissionsTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Сообщество: Настройки'
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CommunityPermissionsSettings({ params: paramsPromise }: PageProps) {
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

	const communityRoles = await payload.find({
		collection: 'roles',
		where: {
			community: {
				equals: community.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

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

	return (
		<>
			<SettingsCommunityPermissionsTopMenu communityId={community.id} />
			<SettingsCommunityPermissionsRolesGroup
				data={community}
				communityRoles={communityRoles.docs}
				communityUsers={communityUsers.docs}
			/>
		</>
	)
}

const queryCommunityById = cache(async ({ id }: { id: string | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: id,
		depth: 2
	})

	return community || null
})

import { User } from '@/payload-types'
import { SettingsHostPermissionsBansGroup } from '@/shared/components/host/settings/permissions/bans/settings-host-permissions-bans-group'
import { SettingsHostPermissionsTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Платформа: Настройки'
}

export default async function HostPermissionsSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	const payload = await getPayload({ config: configPromise })

	if (!currentUser) {
		return redirect('/')
	}

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
	})

	const users = await payload.find({
		collection: 'users',
		pagination: false,
		overrideAccess: true
	})

	const hostUsersBans = await payload.find({
		collection: 'hostUsersBans',
		pagination: false,
		overrideAccess: true
	})

	const communities = await payload.find({
		collection: 'communities',
		pagination: false,
		overrideAccess: true
	})

	const hostCommunitiesBans = await payload.find({
		collection: 'hostCommunitiesBans',
		pagination: false,
		overrideAccess: true
	})

	return (
		<>
			<SettingsHostPermissionsTopMenu />
			<SettingsHostPermissionsBansGroup
				currentUser={currentUser}
				users={users.docs}
				hostUsersBans={hostUsersBans.docs}
				communities={communities.docs}
				hostCommunitiesBans={hostCommunitiesBans.docs}
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

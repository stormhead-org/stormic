import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostPermissionsGroup } from '@/shared/components/host/settings/settings-host-permissions-group'
import { SettingsHostPermissionsTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-permissions-top-menu'
import { SettingsCommunityPermissionsGroup } from '@/shared/components/profiles/settings/community/settings-community-permissions-group'
import { SettingsCommunityPermissionsTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function HostPermissionsSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	
	if (!currentUser) {
		return <NotAuth />
	}
	
	const payload = await getPayload({ config: configPromise })
	
	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
	})
	
	// const isOwner = currentUser.id === resultGlobalHost.owner.id
	//
	// if (!isOwner) {
	// 	return <AccessDenied />
	// }

	return (
		<>
			<SettingsHostPermissionsTopMenu />
			<SettingsHostPermissionsGroup host={resultGlobalHost} />
		</>
	)
}

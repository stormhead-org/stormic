import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostMainGroup } from '@/shared/components/host/settings/settings-host-main-group'
import { SettingsHostMainTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-main-top-menu'
import { AccessDenied } from '@/shared/components/info-blocks/access-denied'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { SettingsCommunityMainGroup } from '@/shared/components/profiles/settings/community/settings-community-main-group'
import { SettingsCommunityMainTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-main-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function HostMainSettings() {
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
			<SettingsHostMainTopMenu />
			<SettingsHostMainGroup ownerId={currentUser.id} host={resultGlobalHost} />
		</>
	)
}

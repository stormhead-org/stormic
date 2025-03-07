import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostAdministrationGroup } from '@/shared/components/host/settings/settings-host-administration-group'
import {
	SettingsHostAdministrationTopMenu
} from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-administration-top-menu'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { SettingsCommunityAdministrationGroup } from '@/shared/components/profiles/settings/community/settings-community-administration-group'
import { SettingsCommunityAdministrationTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-administration-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function HostAdministrationSettings() {
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
			<SettingsHostAdministrationTopMenu />
			<SettingsHostAdministrationGroup ownerId={currentUser.id} host={resultGlobalHost} />
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

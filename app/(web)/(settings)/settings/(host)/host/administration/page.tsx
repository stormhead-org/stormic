import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostAdministrationGroup } from '@/shared/components/host/settings/administration/settings-host-administration-group'
import { SettingsHostAdministrationTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-administration-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Платформа: Настройки'
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
			<SettingsHostAdministrationGroup
				ownerId={currentUser.id}
				host={resultGlobalHost}
			/>
		</>
	)
}

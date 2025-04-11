import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostPermissionsRolesGroup } from '@/shared/components/host/settings/permissions/roles/settings-host-permissions-roles-group'
import { SettingsHostPermissionsTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Платформа: Настройки'
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

	const hostRoles = await payload.find({
		collection: 'hostRoles',
		pagination: false,
		overrideAccess: true
	})

	const users = await payload.find({
		collection: 'users',
		pagination: false,
		overrideAccess: true
	})

	return (
		<>
			<SettingsHostPermissionsTopMenu />
			<SettingsHostPermissionsRolesGroup
				data={resultGlobalHost}
				hostRoles={hostRoles.docs}
				users={users.docs}
			/>
		</>
	)
}

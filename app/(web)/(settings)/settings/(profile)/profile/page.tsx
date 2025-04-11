import { User } from '@/payload-types'
import { SettingsProfileEditGroup } from '@/shared/components/profiles/settings/user/profile/edit/settings-profile-edit-group'
import { SettingsProfileTopMenu } from '@/shared/components/profiles/settings/user/settings-page-items/personal-profile-settings-items/settings-profile-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Профиль: Настройки'
}

export default async function UserProfileSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const payload = await getPayload({ config: configPromise })

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 2
	})

	if (!user) {
		return redirect('/not-auth')
	}

	return (
		<>
			<SettingsProfileTopMenu />
			<SettingsProfileEditGroup user={user} />
		</>
	)
}

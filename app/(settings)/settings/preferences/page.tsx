import { prisma } from '@/prisma/prisma-client'
import {
	SettingsProfilePreferencesTopMenu
} from '@/shared/components/profiles/settings/settings-page-items/personal-profile-settings-items/settings-profile-preferences-top-menu'
import {
	SettingsProfilePreferencesPageGroup
} from '@/shared/components/profiles/settings/settings-profile-preferences-page-group'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function ProfilePage() {
	const session = await getUserSession()
	
	if (!session) {
		return redirect('/not-auth')
	}
	
	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	
	if (!user) {
		return redirect('/not-auth')
	}
	
	return (
		<>
			<SettingsProfilePreferencesTopMenu />
			<SettingsProfilePreferencesPageGroup data={user} />
		</>
	)
}

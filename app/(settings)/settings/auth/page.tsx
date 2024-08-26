import { prisma } from '@/prisma/prisma-client'
import { SettingsProfilePageAuthGroup } from '@/shared/components'
import {
	SettingsProfileAuthTopMenu
} from '@/shared/components/profiles/personal-profile-settings-items/settings-profile-auth-top-menu'
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
			<SettingsProfileAuthTopMenu />
			<SettingsProfilePageAuthGroup data={user} />
		</>
	)
}

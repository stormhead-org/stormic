import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function SettingPageRedirect() {
	const session = await getUserSession()
	
	if (!session) {
		return redirect('/')
	}
	
	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	
	if (!user) {
		return redirect('/')
	}
	
	if (user) {
		return redirect('/settings/profile/')
	}
	
	return
}

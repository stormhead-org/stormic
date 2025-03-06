import { User } from '@/payload-types'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function SettingPageRedirect() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/')
	}

	const payload = await getPayload({ config: configPromise })

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 2
	})

	if (!user) {
		return redirect('/')
	}

	if (user) {
		return redirect('/settings/profile/')
	}

	return
}

import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { User } from '@/payload-types'
import { SettingsHostMainSocialGroup } from '@/shared/components/host/settings/main/social/settings-host-main-social-group'
import { SettingsHostMainTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-main-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Платформа: Настройки'
}

export default async function HostMainNavigationSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return <NotAuth />
	}

	const payload = await getPayload({ config: configPromise })

	const resultSocialNavigation = await payload.findGlobal({
		slug: 'social-navigation',
		depth: 2
	})

	return (
		<>
			<SettingsHostMainTopMenu />
			<SettingsHostMainSocialGroup initialData={resultSocialNavigation} />
		</>
	)
}

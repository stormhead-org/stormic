import NotAuth from '@/app/(web)/(main)/not-auth/page'
import { Post, User } from '@/payload-types'
import { SettingsHostMainNavigationGroup } from '@/shared/components/host/settings/main/navigation/settings-host-main-navigation-group'
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

	const resultSidebarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation',
		depth: 2
	})

	const resultPosts = await payload.find({
		collection: 'posts',
		where: {
			_status: {
				equals: 'published'
			},
			hasDeleted: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true,
		depth: 2
	})

	const posts = resultPosts.docs as Post[]

	return (
		<>
			<SettingsHostMainTopMenu />
			<SettingsHostMainNavigationGroup
				initialData={resultSidebarNavigation}
				posts={posts}
			/>
		</>
	)
}

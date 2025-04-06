import { Community, Post, User } from '@/payload-types'
import { SettingsHostPermissionsBansGroup } from '@/shared/components/host/settings/permissions/bans/settings-host-permissions-bans-group'
import { SettingsHostPermissionsTopMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-permissions-top-menu'
import { PostDeletedForm } from '@/shared/components/posts/deleted/post-deleted-form'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Права доступа: Удаленные'
}

export default async function HostPermissionsSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	const payload = await getPayload({ config: configPromise })

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const result = await payload.find({
		collection: 'posts',
		where: {
			hasDeleted: {
				equals: true
			}
		},
		pagination: false,
		overrideAccess: true,
		depth: 2
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const posts = result.docs as Post[]
	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<SettingsHostPermissionsTopMenu />
			<PostDeletedForm post={posts} communities={communities} />
		</>
	)
}

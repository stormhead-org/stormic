import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { SettingsCommunityAdministrationGroup } from '@/shared/components/profiles/settings/community/administration/settings-community-administration-group'
import { SettingsCommunityAdministrationTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-administration-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Сообщество: Настройки'
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CommunityAdministrationSettings({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const payload = await getPayload({ config: configPromise })

	const community = await queryCommunityById({ id })

	if (!community) {
		return <CommunityNotFound />
	}

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
			<SettingsCommunityAdministrationTopMenu data={community} />
			<SettingsCommunityAdministrationGroup community={community} />
		</>
	)
}

const queryCommunityById = cache(async ({ id }: { id: string | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: id,
		depth: 2
	})

	return community || null
})

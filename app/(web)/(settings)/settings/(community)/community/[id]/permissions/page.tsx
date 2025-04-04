import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { SettingsCommunityPermissionsGroup } from '@/shared/components/profiles/settings/community/settings-community-permissions-group'
import { SettingsCommunityPermissionsTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

type Args = {
	params: {
		id?: number
	}
}

export default async function CommunityPermissionsSettings({
	params: paramsPromise
}: Args) {
	const { id = null } = await paramsPromise

	return redirect(`/settings/community/${id}/permissions/roles`)
}

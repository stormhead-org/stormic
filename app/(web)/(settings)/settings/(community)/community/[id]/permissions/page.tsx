import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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

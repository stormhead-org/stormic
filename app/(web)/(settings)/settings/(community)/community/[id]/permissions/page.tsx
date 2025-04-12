import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CommunityPermissionsSettings({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise

	return redirect(`/settings/community/${id}/permissions/roles`)
}

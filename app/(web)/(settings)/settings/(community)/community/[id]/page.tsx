import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Сообщество: Настройки'
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function SettingCommunityRedirect({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise

	return redirect(`/settings/community/${id}/main`)
}

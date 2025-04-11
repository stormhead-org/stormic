import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Сообщество: Настройки'
}

type Args = {
	params: {
		id?: number
	}
}

export default async function SettingCommunityRedirect({
	params: paramsPromise
}: Args) {
	const { id = null } = await paramsPromise

	return redirect(`/settings/community/${id}/main`)
}

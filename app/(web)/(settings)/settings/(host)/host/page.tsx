import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function SettingHostRedirect() {
	return redirect(`/settings/host/main`)
}

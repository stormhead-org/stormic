import { TFormSettingsCommunityValues } from '@/shared/components/modals/communities/settings/forms/schemas'

export type TSettingsCommunityResponse = {
	message: string
	user: {
		id: string
		email: string
		fullName: string
		createdAt: string
	}
}

export async function settingsCommunity(
	data: TFormSettingsCommunityValues
): Promise<TSettingsCommunityResponse> {
	try {
		const req = await fetch('/api/communities', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: data.title,
				communityDescription: data.description
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка регистрации: ${req.status}`)
		}

		const result = await req.json()
		return result as TSettingsCommunityResponse
	} catch (error) {
		console.error('Ошибка создания сообщества:', error)
		throw error
	}
}

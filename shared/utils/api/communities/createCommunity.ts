import { TFormCommunityValues } from '@/shared/components/modals/new-community-modal/forms/schemas'

export type TCommunityResponse = {
	message: string
	user: {
		id: string
		email: string
		fullName: string
		createdAt: string
	}
}

export async function createCommunity(
	data: TFormCommunityValues
): Promise<TCommunityResponse> {
	try {
		const req = await fetch('/api/communities', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: data.title,
				description: data.description,
				owner: data.userId
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка регистрации: ${req.status}`)
		}

		const result = await req.json()
		return result as TCommunityResponse
	} catch (error) {
		console.error('Ошибка создания сообщества:', error)
		throw error
	}
}

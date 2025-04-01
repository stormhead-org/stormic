import { TFormCommunityValues } from '@/shared/components/modals/new-community-modal/forms/schemas'

export type TCommunityResponse = {
	message: string
	user: {
		id: string
		email: string
		fullName: string
		createdAt: string
	}
	id?: string
}

export async function createCommunity(
	data: TFormCommunityValues
): Promise<TCommunityResponse> {
	try {
		const communityReq = await fetch('/api/communities', {
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

		if (!communityReq.ok) {
			throw new Error(`Ошибка создания сообщества: ${communityReq.status}`)
		}

		const communityResult = await communityReq.json()

		const communityId =
			communityResult.id || communityResult._id || communityResult.doc?.id
		if (!communityId) {
			throw new Error(
				'ID сообщества не найден в ответе API. Проверьте структуру ответа.'
			)
		}

		const systemRoleData = {
			name: '@everyone',
			community: communityId
		}

		const systemRoleReq = await fetch('/api/roles', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(systemRoleData)
		})

		if (!systemRoleReq.ok) {
			throw new Error(`Ошибка создания роли: ${systemRoleReq.status}`)
		}

		return communityResult as TCommunityResponse
	} catch (error) {
		console.error('Ошибка создания сообщества или роли:', error)
		throw error
	}
}

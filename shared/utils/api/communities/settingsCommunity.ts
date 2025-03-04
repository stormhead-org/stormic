export async function settingsCommunity({
	communityId,
	logo,
	banner,
	title,
	description,
	email,
	rules,
	tableCommunityInfo
}: {
	communityId: number
	logo?: number
	banner?: number
	title: string
	description?: string
	email?: string
	rules?: {
		communityNameRule: string
		communityDescriptionRule?: string | null
	}[]
	tableCommunityInfo?: { label: string; value: string }[]
}) {
	try {
		const req = await fetch(`/api/communities/${communityId}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				communityLogo: logo,
				communityBanner: banner,
				title: title,
				communityDescription: description,
				communityContactEmail: email,
				rules: rules,
				tableCommunityInfo: tableCommunityInfo
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка обновления сообщества: ${req.status}`)
		}

		const result = await req.json()
		return result
	} catch (error) {
		console.error('Ошибка обновления сообщества:', error)
		throw error
	}
}

export async function settingsCommunity({
	communityId,
	logo,
	banner,
	title,
	description,
	email,
	rules,
	tableInfo
}: {
	communityId: number
	logo?: number
	banner?: number
	title?: string
	description?: string
	email?: string
	rules?: {
		communityNameRule: string
		communityDescriptionRule?: string | null
	}[]
	tableInfo?: { label: string; value: string }[]
}) {
	try {
		const req = await fetch(`/api/communities/${communityId}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				logo: logo,
				banner: banner,
				title: title,
				description: description,
				contacts: email,
				rules: rules,
				tableInfo: tableInfo
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

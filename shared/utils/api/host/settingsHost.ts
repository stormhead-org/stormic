export async function settingsHost({
	ownerId,
	                                   logo,
	                                   banner,
	                                   authBanner,
	                                   title,
	slogan,
	                                   description,
	                                   email,
	                                   rules,
}: {
	ownerId: number
	logo?: number
	banner?: number
	authBanner?: number
	title?: string
	slogan?: string
	description?: string
	email?: string
	rules?: {
		nameRule: string
		descriptionRule?: string | null
	}[]
}) {
	try {
		const req = await fetch(`/api/globals/host-settings`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				owner: ownerId,
				logo: logo,
				banner: banner,
				authBanner: authBanner,
				title: title,
				slogan: slogan,
				description: description,
				contacts: email,
				rules: rules
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка обновления сервера: ${req.status}`)
		}

		const result = await req.json()
		return result
	} catch (error) {
		console.error('Ошибка обновления сервера:', error)
		throw error
	}
}

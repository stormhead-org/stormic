export async function updateSocialNavigation(data: {
	twitter?: string | null
	facebook?: string | null
	github?: string | null
	instagram?: string | null
	twitch?: string | null
}): Promise<void> {
	try {
		const req = await fetch('/api/globals/social-navigation', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!req.ok) {
			throw new Error(`Ошибка обновления социальных сетей: ${req.status}`)
		}

		const result = await req.json()
		console.log('API response:', result)
		return result
	} catch (error) {
		console.error('Ошибка обновления социальных сетей:', error)
		throw error
	}
}

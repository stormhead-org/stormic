export async function settingsUser({
	userId,
	avatar,
	banner,
	name,
	description,
	email,
	tableInfo
}: {
	userId: number
	avatar?: number
	banner?: number
	name?: string
	description?: string
	email?: string
	tableInfo?: { label: string; value: string }[]
}) {
	try {
		const req = await fetch(`/api/users/${userId}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: avatar,
				banner: banner,
				name: name,
				description: description,
				email: email,
				tableInfo: tableInfo
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка обновления профиля: ${req.status}`)
		}

		const result = await req.json()
		return result
	} catch (error) {
		console.error('Ошибка обновления профиля:', error)
		throw error
	}
}

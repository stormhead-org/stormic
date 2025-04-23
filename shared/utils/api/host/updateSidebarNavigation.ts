export async function updateSidebarNavigation(
	items: { post: number }[]
): Promise<void> {
	try {
		const req = await fetch('/api/globals/sidebar-navigation', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка обновления навигации: ${req.status}`)
		}

		const result = await req.json()
		return result
	} catch (error) {
		console.error('Ошибка обновления навигации:', error)
		throw error
	}
}

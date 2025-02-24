export async function signOut(): Promise<{ message: string }> {
	try {
		const response = await fetch('/api/users/logout', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error(`Ошибка при выходе: ${response.status}`)
		}

		const data = await response.json()
		return data as { message: string }
	} catch (error) {
		console.error('Ошибка при выходе:', error)
		throw error
	}
}

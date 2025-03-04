export async function createMedia(data: any) {
	try {
		const req = await fetch('/api/media?depth=0&fallback-locale=null', {
			method: 'POST',
			body: data
		})

		if (!req.ok) {
			throw new Error(`Ошибка создания медиа: ${req.status}`)
		}

		const result = await req.json()
		return result
	} catch (error) {
		console.error('Ошибка создания медиа:', error)
		throw error
	}
}

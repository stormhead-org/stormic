export type TFormLoginValues = {
	email: string
	password: string
}

export type TSignInResponse = {
	message: string
	user: {
		id: string
		email: string
		_verified: boolean
		createdAt: string
		updatedAt: string
	}
	token: string
	exp: number
}

export async function signIn(
	credentials: TFormLoginValues
): Promise<TSignInResponse> {
	try {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})

		if (!response.ok) {
			throw new Error(`Ошибка авторизации: ${response.status}`)
		}

		const data = await response.json()
		return data as TSignInResponse
	} catch (error) {
		console.error('Ошибка при входе:', error)
		throw error
	}
}

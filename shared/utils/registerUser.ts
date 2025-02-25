import { TFormRegisterValues } from '../components/modals/auth-modal/forms/schemas'

export type TRegisterResponse = {
	message: string
	user: {
		id: string
		email: string
		fullName: string
		createdAt: string
	}
}

export async function registerUser(
	data: TFormRegisterValues
): Promise<TRegisterResponse> {
	try {
		const req = await fetch('/api/users', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				name: data.fullName,
				password: data.password,
				systemRoles: ['everyone']
			})
		})

		if (!req.ok) {
			throw new Error(`Ошибка регистрации: ${req.status}`)
		}

		const result = await req.json()
		return result as TRegisterResponse
	} catch (error) {
		console.error('Ошибка при регистрации:', error)
		throw error
	}
}

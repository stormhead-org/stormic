import { User } from '@/payload-types'
import { cookies } from 'next/headers'

export async function getSession(): Promise<User | null> {
	const cookieStore = await cookies()
	const token = cookieStore.get('payload-token')?.value

	if (!token) {
		return null
	}

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				cache: 'no-store',
			}
		)

		if (!res.ok) {
			return null
		}

		const user = await res.json()
		return user || null
	} catch (error) {
		console.error('Ошибка получения сессии:', error)
		return null
	}
}

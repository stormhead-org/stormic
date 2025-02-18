import type { User } from '@/payload-types'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function getPagesSession(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<User | null> {
	const token = req.cookies['payload-token']

	if (!token) {
		return null
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				},
				cache: 'no-store'
			}
		)

		if (!response.ok) {
			return null
		}

		const user = await response.json()
		return user || null
	} catch (error) {
		console.error('Ошибка получения сессии:', error)
		return null
	}
}

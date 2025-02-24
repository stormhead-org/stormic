// import { authOptions } from '@/shared/constants/'
// import { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth'

// export const getUserSessionPages = async (req: NextApiRequest, res: NextApiResponse) => {
// 	const session = await getServerSession(req, res, authOptions)
// 	return session?.user ?? null
// }

import { User } from '@/payload-types'
import { IncomingMessage } from 'http'
import { parseCookies } from 'nookies'

export async function getUserSessionPages(
	req: IncomingMessage
): Promise<User | null> {
	const cookies = parseCookies({ req })
	const token = cookies['payload-token']

	if (!token) {
		return null
	}

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				},
				cache: 'no-store'
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

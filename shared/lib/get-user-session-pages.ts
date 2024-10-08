import { authOptions } from '@/shared/constants/'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export const getUserSessionPages = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions)
	return session?.user ?? null
}

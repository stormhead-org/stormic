import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authorId, communityId } = req.query

	if (typeof authorId !== 'string' || typeof communityId !== 'string') {
		return res.status(400).json({ error: 'Invalid authorId or communityId' })
	}

	try {
		const permissions = await getUserPermissions(
			Number(authorId),
			parseInt(communityId)
		)
		return res.status(200).json(permissions)
	} catch (err) {
		console.error('Error fetching permissions:', err)
		return res.status(500).json({ error: 'Failed to fetch permissions' })
	}
}

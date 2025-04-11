import { NextApiResponseServerIo } from '@/@types/socket'
import { User } from '@/payload-types'
import { getPagesSession } from '@/shared/lib/pagesAuth'
import configPromise from '@payload-config'
import { NextApiRequest } from 'next'
import { getPayload } from 'payload'
import { cache } from 'react'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	try {
		const profile: User | null = await getPagesSession(req, res)
		const { content, media } = req.body
		const communityId = Number(req.query.communityId)
		const postId = Number(req.query.postId)
		const parentCommentId = req.query.parentCommentId
			? Number(req.query.parentCommentId)
			: null
		const payload = await getPayload({ config: configPromise })

		if (!profile) {
			return res.status(401).json({ error: 'Not authorized' })
		}

		if (!postId) {
			return res.status(400).json({ error: 'Post ID not found' })
		}

		if (!content) {
			return res.status(400).json({ error: 'Content not found' })
		}

		const post = await queryPostById({ postId })

		if (!post) {
			return res.status(404).json({ error: 'Post not found' })
		}
		const newComment = await payload.create({
			collection: 'comments',
			data: {
				parentPost: postId,
				community: communityId,
				author: profile.id,
				parentComment: parentCommentId,
				content,
				media
			},
			overrideAccess: true,
			showHiddenFields: false,
			disableVerificationEmail: false
		})

		const postKey = `chat:${postId}:messages`

		res?.socket?.server?.io?.emit(postKey, newComment)

		const globalKey = `global:comments`

		res?.socket?.server?.io?.emit(globalKey, newComment)

		return res.status(200).json(newComment)
	} catch (error) {
		console.log('MESSAGE_POST', error)
		return res.status(500).json({ message: 'Server error' })
	}
}

const queryPostById = cache(async ({ postId }: { postId: number }) => {
	const payload = await getPayload({ config: configPromise })
	const result = await payload.find({
		collection: 'posts',
		where: {
			id: {
				equals: postId
			}
		}
	})
	return result.docs?.[0] || null
})

import { NextApiResponseServerIo } from '@/@types/socket'
import { User } from '@/payload-types'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
// import { getUserSessionPages } from '@/shared/lib/get-user-session-pages'
import { NextApiRequest } from 'next'
import { draftMode } from 'next/headers'
import path from 'path'
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
		// const profile = await getUserSessionPages(req, res)
		const profile = (await getSession()) as { user: User } | null
		const { content, fileUrl } = req.body
		const { communityId, postId, parentCommentId } = req.query
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
		
		// const post = await prisma.post.findFirst({
		// 	where: {
		// 		post_id: Number(postId)
		// 	}
		// })

		if (!post) {
			return res.status(404).json({ error: 'Post not found' })
		}
		
		const newComment = await payload.create({
			collection: 'comments', // required
			data: {
				content,
				parentPost: Number(postId),
				community: Number(communityId),
				owner: Number(profile.user.id),
				parentComment: parentCommentId ? Number(parentCommentId) : null
			},
			overrideAccess: true,
			showHiddenFields: false,
			
			// If creating verification-enabled auth doc,
			// you can optionally disable the email that is auto-sent
			disableVerificationEmail: false,
			
			// If your collection supports uploads, you can upload
			// a file directly through the Local API by providing
			// its full, absolute file path.
			
			// filePath: path.resolve(__dirname, './path-to-image.jpg'),
			
			// Alternatively, you can directly pass a File,
			// if file is provided, filePath will be omitted
			file: fileUrl,
		})
		
		// const newComment = await prisma.comment.create({
		// 	data: {
		// 		content,
		// 		fileUrl,
		// 		post_id: Number(postId),
		// 		author_id: Number(profile.id),
		// 		parent_comment_id: parentCommentId ? Number(parentCommentId) : null
		// 	},
		// 	include: {
		// 		author: true
		// 	}
		// })

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
	const { isEnabled: draft } = await draftMode()
	
	const payload = await getPayload({ config: configPromise })
	
	const result = await payload.find({
		collection: 'posts',
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			id: {
				equals: postId
			}
		}
	})
	return result.docs?.[0] || null
})

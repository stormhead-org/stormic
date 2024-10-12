import { NextApiResponseServerIo } from '@/@types/socket'
import { prisma } from '@/prisma/prisma-client'
import { getUserSessionPages } from '@/shared/lib/get-user-session-pages'
import { NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}
	
	try {
		const profile = await getUserSessionPages(req, res)
		const { content, fileUrl } = req.body
		const { postId, parentCommentId } = req.query
		
		if (!profile) {
			return res.status(401).json({ error: 'Not authorized' })
		}
		
		if (!postId) {
			return res.status(400).json({ error: 'Post ID not found' })
		}
		
		if (!content) {
			return res.status(400).json({ error: 'Content not found' })
		}
		
		const post = await prisma.post.findFirst({
			where: {
				post_id: Number(postId)
			}
		})
		
		if (!post) {
			return res.status(404).json({ error: 'Post not found' })
		}
		
		const newComment = await prisma.comment.create({
			data: {
				content,
				fileUrl,
				post_id: Number(postId),
				author_id: Number(profile.id),
				parent_comment_id: parentCommentId ? Number(parentCommentId) : null
			},
			include: {
				author: true
			}
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

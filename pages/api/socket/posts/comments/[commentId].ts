import { NextApiResponseServerIo } from '@/@types/socket'
import { prisma } from '@/prisma/prisma-client'
import { getUserSessionPages } from '@/shared/lib/get-user-session-pages'
import { UserRoleType } from '@prisma/client'
import { NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'DELETE' && req.method !== 'PATCH') {
		return res.status(405).json({ error: 'Method запрещен' })
	}
	try {
		const profile = await getUserSessionPages(req, res)
		const { commentId, postId } = req.query
		const { content } = req.body
		
		if (!profile) {
			return res.status(401).json({ error: 'Не авторизован' })
		}
		
		if (!commentId) {
			return res.status(400).json({ error: 'Comment ID не найден' })
		}
		
		if (!postId) {
			return res.status(400).json({ error: 'Post ID не найден' })
		}
		
		const post = await prisma.post.findFirst({
			where: {
				post_id: Number(postId)
			},
			include: {
				comments: true
			}
		})
		
		if (!post) {
			return res.status(404).json({ error: 'Post не найден' })
		}
		
		let comment = await prisma.comment.findFirst({
			where: {
				comment_id: Number(commentId),
				post_id: Number(postId)
			},
			include: {
				author: true
			}
		})
		
		if (!comment || comment.deleted) {
			return res.status(404).json({ error: 'Comment не найден' })
		}
		
		const isMessageOwner = comment.author_id === Number(profile.id)
		const isOwner = profile.role === UserRoleType.OWNER
		const isAdmin = profile.role === UserRoleType.ADMIN
		const canModify = isMessageOwner || isAdmin || isOwner
		
		if (!canModify) {
			return res.status(401).json({ error: 'Не авторизован' })
		}
		
		if (req.method === 'DELETE') {
			comment = await prisma.comment.update({
				where: {
					comment_id: Number(commentId)
				},
				data: {
					fileUrl: null,
					content: 'Комментарий был удален',
					deleted: true
				},
				include: {
					author: true
				}
			})
		}
		
		if (req.method === 'PATCH') {
			if (!isMessageOwner) {
				return res.status(401).json({ error: 'Не авторизован' })
			}
			
			comment = await prisma.comment.update({
				where: {
					comment_id: Number(commentId)
				},
				data: {
					content
				},
				include: {
					author: true
				}
			})
		}
		
		const updateKey = `chat:${postId}:messages:update`
		res?.socket?.server?.io?.emit(updateKey, comment)
		
		const globalUpdateKey = `global:comments:update`
		res?.socket?.server?.io?.emit(globalUpdateKey, comment)
		
		return res.status(200).json(comment)
	} catch (error) {
		console.log('[MESSAGE_ID]', error)
		return res.status(500).json({ error: 'Ошибка сервера' })
	}
}

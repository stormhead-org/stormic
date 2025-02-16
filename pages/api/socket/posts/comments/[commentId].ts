import { NextApiResponseServerIo } from '@/@types/socket'
import type { User } from '@/payload-types'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
// import { getUserSessionPages } from '@/shared/lib/get-user-session-pages'
import { NextApiRequest } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'DELETE' && req.method !== 'PATCH') {
		return res.status(405).json({ error: 'Method запрещен' })
	}
	try {
		// const profile = await getUserSessionPages(req, res)
		const profile = await getSession()
		const { commentId, postId } = req.query
		const { content } = req.body
		const payload = await getPayload({ config: configPromise })

		if (!profile) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (!commentId) {
			return res.status(400).json({ error: 'Comment ID не найден' })
		}

		if (!postId) {
			return res.status(400).json({ error: 'Post ID не найден' })
		}
		
		const post = await queryPostById({ postId })

		if (!post) {
			return res.status(404).json({ error: 'Post не найден' })
		}
		
		const comment = await queryCommentById({ commentId })

		if (!comment || comment.hasDeleted) {
			return res.status(404).json({ error: 'Comment не найден' })
		}

		const isMessageOwner = comment.author.id === Number(profile.id)
		const isOwner = profile.userRoles.roleType === 'owner'
		const isAdmin = profile.userRoles.roleType === 'admin'
		const isModerator = profile.userRoles.roleType === 'moderator'
		const canModify = isMessageOwner || isAdmin || isOwner || isModerator

		if (!canModify) {
			return res.status(401).json({ error: 'Не авторизован' })
		}
		
		if (req.method === 'DELETE') {
			comment = await payload.update({
				collection: 'comments',
				data: {
					content: 'Комментарий был удален',
					hasDeleted: true
				},
				overrideAccess: true,
				showHiddenFields: false,
				disableVerificationEmail: false,
				file: null,
				where: {
					id: {
						equals: commentId
					}
				}
			})
		}

		if (req.method === 'PATCH') {
			if (!isMessageOwner) {
				return res.status(401).json({ error: 'Не авторизован' })
			}
			
			comment = await payload.update({
				collection: 'comments',
				data: {
					content
				},
				overrideAccess: true,
				showHiddenFields: false,
				disableVerificationEmail: false,
				where: {
					id: {
						equals: commentId
					}
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

const queryCommentById = cache(async ({ commentId }: { commentId: number }) => {
	const { isEnabled: draft } = await draftMode()
	
	const payload = await getPayload({ config: configPromise })
	
	const result = await payload.find({
		collection: 'comments',
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			id: {
				equals: commentId
			}
		}
	})
	return result.docs?.[0] || null
})

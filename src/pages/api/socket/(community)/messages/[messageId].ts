import { currentProfilePages } from '@/lib/(profile)/current-profile-pages'
import { db } from '@/lib/db'
import { NextApiResponseServerIo } from '@/types'
import { MemberRole } from '@prisma/client'
import { NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'DELETE' && req.method !== 'PATCH') {
		return res.status(405).json({ error: 'Method запрещен' })
	}
	try {
		const profile = await currentProfilePages(req)
		const { messageId, serverId, channelId } = req.query
		const { content } = req.body

		if (!profile) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (!serverId) {
			return res.status(400).json({ error: 'Server ID не найден' })
		}

		if (!channelId) {
			return res.status(400).json({ error: 'Channel ID не найден' })
		}

		const server = await db.server.findFirst({
			where: {
				id: serverId as string,
				members: {
					some: {
						profileId: profile.id
					}
				}
			},
			include: {
				members: true
			}
		})

		if (!server) {
			return res.status(404).json({ error: 'Server не найден' })
		}

		const channel = await db.channel.findFirst({
			where: {
				id: channelId as string,
				serverId: serverId as string
			}
		})

		if (!channel) {
			return res.status(404).json({ error: 'Channel не найден' })
		}

		const member = server.members.find(
			(member) => member.profileId === profile.id
		)

		if (!member) {
			return res.status(404).json({ error: 'Member не найден' })
		}

		let message = await db.message.findFirst({
			where: {
				id: messageId as string,
				channelId: channelId as string
			},
			include: {
				member: {
					include: {
						profile: true
					}
				}
			}
		})

		if (!message || message.deleted) {
			return res.status(404).json({ error: 'Message не найден' })
		}

		const isMessageOwner = message.memberId === member.id
		const isAdmin = member.role === MemberRole.ADMIN
		const isModerator = member.role === MemberRole.MODERATOR
		const canModify = isMessageOwner || isAdmin || isModerator

		if (!canModify) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (req.method === 'DELETE') {
			message = await db.message.update({
				where: {
					id: messageId as string
				},
				data: {
					fileUrl: null,
					content: 'Сообщение было удалено',
					deleted: true
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				}
			})
		}

		if (req.method === 'PATCH') {
			if (!isMessageOwner) {
				return res.status(401).json({ error: 'Не авторизован' })
			}

			message = await db.message.update({
				where: {
					id: messageId as string
				},
				data: {
					content
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				}
			})
		}

		const updateKey = `chat:${channelId}:messages:update`

		res?.socket?.server?.io?.emit(updateKey, message)

		return res.status(200).json(message)
	} catch (error) {
		console.log('[MESSAGE_ID]', error)
		return res.status(500).json({ error: 'Ошибка сервера' })
	}
}

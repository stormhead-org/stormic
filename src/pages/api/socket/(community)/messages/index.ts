import { currentProfilePages } from '@/lib/(profile)/current-profile-pages'
import { db } from '@/lib/db'
import { NextApiResponseServerIo } from '@/types'
import { NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Метод запрещен' })
	}

	try {
		const profile = await currentProfilePages(req)
		const { content, fileUrl } = req.body
		const { serverId, channelId } = req.query

		if (!profile) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (!serverId) {
			return res.status(400).json({ error: 'Server ID не найден' })
		}

		if (!channelId) {
			return res.status(400).json({ error: 'Channel ID не найден' })
		}

		if (!content) {
			return res.status(400).json({ error: 'Content не найден' })
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

		const message = await db.message.create({
			data: {
				content,
				fileUrl,
				channelId: channelId as string,
				memberId: member.id
			},
			include: {
				member: {
					include: {
						profile: true
					}
				}
			}
		})

		const channelKey = `chat:${channelId}:messages`

		res?.socket?.server?.io?.emit(channelKey, message)

		return res.status(200).json(message)
	} catch (error) {
		console.log('MESSAGE_POST', error)
		return res.status(500).json({ message: 'Ошибка сервера' })
	}
}

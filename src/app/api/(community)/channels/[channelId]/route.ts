import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function DELETE(
	req: Request,
	{ params }: { params: { channelId: string } }
) {
	try {
		const profile = await currentProfile()
		const { searchParams } = new URL(req.url)
		const serverId = searchParams.get('serverId')

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		if (!serverId) {
			return new NextResponse('SERVER ID не найден', { status: 400 })
		}

		if (!params.channelId) {
			return new NextResponse('CHANNEL ID не найден', { status: 400 })
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR],
						},
					},
				},
			},
			data: {
				channels: {
					delete: {
						id: params.channelId,
						name: {
							not: 'general',
						},
					},
				},
			},
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[CHANNEL_ID_DELETE]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { channelId: string } }
) {
	try {
		const profile = await currentProfile()
		const { name, type } = await req.json()
		const { searchParams } = new URL(req.url)
		const serverId = searchParams.get('serverId')

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		if (!serverId) {
			return new NextResponse('SERVER ID не найден', { status: 400 })
		}

		if (!params.channelId) {
			return new NextResponse('CHANNEL ID не найден', { status: 400 })
		}

		if (name === 'general') {
			return new NextResponse('Название "General" не может быть назначено', {
				status: 400,
			})
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR],
						},
					},
				},
			},
			data: {
				channels: {
					update: {
						where: {
							id: params.channelId,
							NOT: {
								name: 'general',
							},
						},
						data: {
							name,
							type,
						},
					},
				},
			},
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[CHANNEL_ID_PATCH]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

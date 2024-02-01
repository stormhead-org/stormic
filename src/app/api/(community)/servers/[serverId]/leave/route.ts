import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile()

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		if (!params.serverId) {
			return new NextResponse('SERVER ID не найден', { status: 400 })
		}

		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: {
					not: profile.id
				},
				members: {
					some: {
						profileId: profile.id
					}
				}
			},
			data: {
				members: {
					deleteMany: {
						profileId: profile.id
					}
				}
			}
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[SERVER_ID_LEAVE]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

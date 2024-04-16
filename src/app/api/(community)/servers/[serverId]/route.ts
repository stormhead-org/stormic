import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function DELETE(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile()

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		const server = await db.server.delete({
			where: {
				id: params.serverId,
				profileId: profile.id
			}
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[SERVER_ID_DELETE]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile()
		const { name, imageUrl, imageSrvUrl } = await req.json()

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id
			},
			data: {
				name,
				imageUrl,
				imageSrvUrl
			}
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[SERVER_ID_PATCH]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

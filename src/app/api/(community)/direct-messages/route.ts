import { DirectMessage } from '@prisma/client'
import { NextResponse } from 'next/server'

import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'

const MESSAGES_BATCH = 40

export async function GET(req: Request) {
	try {
		const profile = await currentProfile()
		const { searchParams } = new URL(req.url)

		const cursor = searchParams.get('cursor')
		const conversationId = searchParams.get('conversationId')

		if (!profile) {
			return new NextResponse('Не авторизован', { status: 401 })
		}

		if (!conversationId) {
			return new NextResponse('Conversation ID не найден', { status: 400 })
		}

		let messages: DirectMessage[] = []

		if (cursor) {
			messages = await db.directMessage.findMany({
				take: MESSAGES_BATCH,
				skip: 1,
				cursor: {
					id: cursor
				},
				where: {
					conversationId
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		} else {
			messages = await db.directMessage.findMany({
				take: MESSAGES_BATCH,
				where: {
					conversationId
				},
				include: {
					member: {
						include: {
							profile: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		}

		let nextCursor = null

		if (messages.length === MESSAGES_BATCH) {
			nextCursor = messages[MESSAGES_BATCH - 1].id
		}

		return NextResponse.json({
			items: messages,
			nextCursor
		})
	} catch (error) {
		console.log('[DIRECT_MESSAGES_GET]', error)
		return new NextResponse('Ошибка сервера', { status: 500 })
	}
}

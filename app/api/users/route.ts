import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const userId = searchParams.get('userId')
	
	if (userId) {
		// Запрос информации о конкретном пользователе с указанным userId
		const user = await prisma.user.findUnique({
			where: { id: parseInt(userId) },
			include: { // Включаем связанные данные
				customFields: true
			}
		})
		
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 })
		}
		
		return NextResponse.json(user)
	} else {
		// Запрос всех пользователей
		const users = await prisma.user.findMany({
			include: { // Включаем связанные данные для всех пользователей
				customFields: true
			}
		})
		
		return NextResponse.json(users)
	}
}


export async function POST(req: NextRequest) {
	const data = await req.json()
	
	const user = await prisma.user.create({
		data
	})
	
	return NextResponse.json(user)
}

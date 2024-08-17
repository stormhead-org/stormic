import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	// Получаем параметры запроса
	const url = new URL(request.url)
	const categoryId = url.searchParams.get('categoryId')
	
	// Условие для фильтрации постов: если `userId` передан, то фильтруем по нему
	const whereCondition = categoryId ? { category_id: Number(categoryId) } : {}
	
	// Ищем посты (либо все, либо для конкретного пользователя)
	const categories = await prisma.category.findMany({
		where: whereCondition
	})
	
	return NextResponse.json(categories)
	
	// const categories = await prisma.category.findMany()
	//
	// return NextResponse.json(categories)
}

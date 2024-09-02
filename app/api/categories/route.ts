import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	// Получаем параметры запроса
	const url = new URL(request.url)
	const categoryId = url.searchParams.get('categoryId')
	
	// Условие для фильтрации постов: если `categoryId` передан, то фильтруем по нему
	const whereCondition = categoryId ? { category_id: Number(categoryId) } : {}
	
	// Ищем категории вместе с количеством постов и подписчиков
	const categories = await prisma.category.findMany({
		where: whereCondition,
		select: {
			category_id: true,
			category_name: true,
			category_banner: true,
			category_description: true,
			category_image: true,
			category_url: true,
			owner_id: true,
			_count: {
				select: {
					posts: true, // количество постов
					followers: true // количество подписчиков
				}
			}
		}
	})
	
	// Преобразуем результат, чтобы поднять `posts` и `followers` на уровень выше и удалить `_count`
	const transformedCategories = categories.map(category => ({
		category_id: category.category_id,
		category_name: category.category_name,
		category_banner: category.category_banner,
		category_description: category.category_description,
		category_image: category.category_image,
		category_url: category.category_url,
		owner_id: category.owner_id,
		posts: category._count.posts,       // поднимаем на верхний уровень
		followers: category._count.followers // поднимаем на верхний уровень
	}))
	
	return NextResponse.json(transformedCategories)
}

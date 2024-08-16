import { prisma } from '@/prisma/prisma-client'

export default async function CategoryPage({
	                                           params: { id }
                                           }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const categoryId = Number(id)
	
	// Ищем категорию по id
	const category = await prisma.category.findUnique({
		where: { category_id: categoryId }
	})
	
	// Проверяем, найдена ли категория
	if (!category) {
		return (
			<p>Категория не найдена</p>
		)
	}
	
	return (
		<>
			<p>Category ID: {category.category_id}</p>
			<p>Название категории: {category.category_name}</p>
			<p>Описание категории: {category.category_description}</p>
		</>
	)
}

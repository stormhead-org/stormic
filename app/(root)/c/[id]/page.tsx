import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'

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
			<Container className='flex flex-col my-10'>
				<p>Категория не найдена</p>
			</Container>
		)
	}
	
	return (
		<Container className='flex flex-col my-10'>
			<p>Category ID: {category.category_id}</p>
			<p>Название категории: {category.category_name}</p>
			<p>Описание категории: {category.category_description}</p>
		</Container>
	)
}

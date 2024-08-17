import { prisma } from '@/prisma/prisma-client'
import { CategoryProfileGroup } from '@/shared/components/profiles/category-profile-group'

export default async function CategoryPage({
	                                           params: { id }
                                           }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const categoryId = Number(id)
	
	// Ищем категорию по id и считаем количество подписчиков
	const [categoryWithDetails, stormicBanner] = await Promise.all([
		await prisma.category.findUnique({
			where: { category_id: categoryId },
			include: {
				_count: {
					select: { followers: true }
				},
				owner: true // Включаем данные о владельце категории
			}
		}),
		prisma.stormicMedia.findFirst({
			where: { mediaType: 'BANNER' }
		})
	])
	
	// Проверяем, найдена ли категория
	if (!categoryWithDetails) {
		return (
			<p>Категория не найдена</p>
		)
	}
	
	return (
		<CategoryProfileGroup
			profileBanner={String(categoryWithDetails.category_banner || stormicBanner.url)}
			profileAvatar={categoryWithDetails.category_image || ''}
			profileName={categoryWithDetails.category_name}
			profileDescription={categoryWithDetails.category_description || ''}
			profileFollowers={categoryWithDetails._count.followers}
			categoryId={String(categoryId)}
		/>
	)
}

// <h1>{categoryWithDetails.category_name}</h1>
// <p>{categoryWithDetails.category_description}</p>
// <img src={categoryWithDetails.category_image} alt={categoryWithDetails.category_name} />
// <p>URL: {categoryWithDetails.category_url}</p>
// <p>Owner:</p>
// <div>
// 	<img src={categoryWithDetails.owner.profile_picture || '/default-avatar.png'}
// 	     alt={categoryWithDetails.owner.fullName} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
// 	<p>Name: {categoryWithDetails.owner.fullName}</p>
// 	<a href={`/u/${categoryWithDetails.owner.id}`}>Profile Link</a>
// </div>
// <p>Followers Count: {categoryWithDetails._count.followers}</p>

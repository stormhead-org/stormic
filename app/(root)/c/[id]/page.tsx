import { prisma } from '@/prisma/prisma-client'
import { CategoryCommunityProfileGroup } from '@/shared/components/profiles/category-community-profile-group'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Stormic: Сообщества'
}

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
	
	const profileBannerUrl = categoryWithDetails.category_banner
		? String(categoryWithDetails.category_banner)
		: stormicBanner?.url
			? String(stormicBanner.url)
			: '/defaultBanner.jpg'
	
	return (
		<CategoryCommunityProfileGroup
			profileBanner={profileBannerUrl}
			profileAvatar={categoryWithDetails.category_image || ''}
			profileName={categoryWithDetails.category_name}
			profileDescription={categoryWithDetails.category_description || ''}
			profileFollowers={categoryWithDetails._count.followers}
			categoryId={String(categoryId)}
		/>
	)
}

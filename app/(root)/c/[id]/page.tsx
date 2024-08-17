import { prisma } from '@/prisma/prisma-client'
import { CategoryProfileGroup } from '@/shared/components/profiles/category-profile-group'

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
	
	// Ищем категорию по id и считаем количество подписчиков
	const [user, followersCount] = await Promise.all([
		prisma.category.findUnique({
			where: { category_id: categoryId }
		}),
		prisma.userSubscription.count({
			where: {
				followingId: userId
			}
		}),
		prisma.userSubscription.count({
			where: {
				followerId: userId
			}
		})
	])
	
	// Проверяем, найдена ли категория
	if (!category) {
		return (
			<p>Категория не найдена</p>
		)
	}
	
	return (
		<>
			<CategoryProfileGroup
				userName={user.fullName}
				profileBanner={String(user.profile_banner)}
				userRegTime={userRegConvert}
				userRep={userRep}
				userAvatar={user.profile_picture || ''}
				userBio={user.bio || ''}
				userSub={followersCount}
				userSubscribes={followingCount}
				userId={String(userId)}
			/>
		</>
	)
}

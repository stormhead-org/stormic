import { prisma } from '@/prisma/prisma-client'
import { UserProfileGroup } from '@/shared/components/profiles/user-profile-group'
import { format } from 'date-fns'

export default async function UserPage({
	                                       params: { id }
                                       }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const userId = Number(id)
	
	// Ищем пользователя по id и считаем количество подписчиков и подписок
	const [user, followersCount, followingCount, stormicBanner] = await Promise.all([
		prisma.user.findUnique({
			where: { id: userId },
			include: {
				reputation: {
					select: {
						points: true
					}
				}
			}
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
		}),
		prisma.stormicMedia.findFirst({
			where: { mediaType: 'BANNER' }
		})
	])
	
	// Проверяем, найден ли пользователь
	if (!user) {
		return (
			<p>Пользователь не найден</p>
		)
	}
	
	// Проверяем, есть ли репутация и присваиваем 0, если она отсутствует
	const userRep = user.reputation ? Number(user.reputation.points) : 0
	
	// Форматируем дату регистрации пользователя
	const userRegConvert = format(new Date(user.createdAt), 'dd.MM.yy')
	
	
	return (
		<>
			<UserProfileGroup
				userName={user.fullName}
				profileBanner={String(user.profile_banner || stormicBanner.url)}
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

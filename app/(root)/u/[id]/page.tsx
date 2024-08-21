import { prisma } from '@/prisma/prisma-client'
import { UserProfileGroup } from '@/shared/components/profiles/user-profile-group'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

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
	
	const profileBannerUrl = user.profile_banner
		? String(user.profile_banner)
		: stormicBanner?.url
			? String(stormicBanner.url)
			: '/defaultBanner.jpg'
	
	return (
		<>
			<UserProfileGroup
				profileBanner={profileBannerUrl}
				profileAvatar={user.profile_picture || ''}
				profileName={user.fullName}
				profileDescription={user.bio || ''}
				profileRep={userRep}
				profileRegTime={userRegConvert}
				profileFollowers={followingCount}
				profileFollowing={followersCount}
				userId={String(userId)}
			/>
		</>
	)
}

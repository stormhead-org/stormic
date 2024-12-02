import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { UserCommunityProfileGroup } from '@/shared/components/profiles/user-community-profile-group'
import { UBlogPage } from '@/shared/components/simple-pages/ublog-page'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Blog'
}

export default async function UserBlogPage({
	                                       params: { id }
                                       }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const userId = Number(id)
	
	// Ищем пользователя по id и считаем количество подписчиков и подписок
	const [user] = await Promise.all([
		prisma.user.findUnique({
			where: { id: userId },
		}),
	])
	
	// Проверяем, найден ли пользователь
	if (!user) {
		return <UserNotFound />
	}
	
	return (
		<UBlogPage author={user} />
	)
}

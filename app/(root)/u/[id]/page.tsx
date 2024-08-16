import { prisma } from '@/prisma/prisma-client'
import { UserProfileGroup } from '@/shared/components/user-profile/user-profile-group'
import { format } from 'date-fns'

// Получение информации о пользователе, включая репутацию
async function getUserProfile(userId: number) {
	return prisma.user.findUnique({
		where: { id: userId },
		include: {
			reputation: {
				select: { points: true }
			}
		}
	})
}

// Получение количества подписчиков и подписок
async function getUserSubscriptions(userId: number) {
	const [followersCount, followingCount] = await Promise.all([
		prisma.userSubscription.count({ where: { followingId: userId } }),
		prisma.userSubscription.count({ where: { followerId: userId } })
	])
	return { followersCount, followingCount }
}

// Получение постов пользователя с дополнительными данными
async function getUserPosts(userId: number) {
	const posts = await prisma.post.findMany({
		where: { author_id: userId },
		include: {
			author: { select: { fullName: true, profile_picture: true } },
			category: { select: { category_name: true } }
		}
	})
	
	return Promise.all(
		posts.map(async (post) => {
			const [bookmarksCount, commentsCount] = await Promise.all([
				prisma.bookmark.count({ where: { post_id: post.post_id } }),
				prisma.comment.count({ where: { post_id: post.post_id } })
			])
			
			return {
				...post,
				commentsCount,
				bookmarksCount,
				publication_date: post.publication_date // Оставляем publication_date типом Date
			}
		})
	)
}

export default async function UserPage({ params: { id } }: { params: { id: string } }) {
	const userId = Number(id)
	
	const [user, { followersCount, followingCount }, postsWithDetails] = await Promise.all([
		getUserProfile(userId),
		getUserSubscriptions(userId),
		getUserPosts(userId)
	])
	
	if (!user) {
		return <p>Пользователь не найден</p>
	}
	
	const userRep = user.reputation?.points ?? 0
	const userRegConvert = format(new Date(user.createdAt), 'dd.MM.yy')
	
	return (
		<UserProfileGroup
			userName={user.fullName}
			profileBanner={String(user.profile_banner)}
			userRegTime={userRegConvert}
			userRep={userRep}
			userAvatar={user.profile_picture || ''}
			userBio={user.bio || ''}
			userSub={followersCount}
			userSubscribes={followingCount}
			profilePosts={postsWithDetails} // Передаем публикации с правильными типами
		/>
	)
}

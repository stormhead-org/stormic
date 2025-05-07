import { Community, FollowCommunity, Post, type User } from '@/payload-types'
import { MyFeedEmpty } from '@/shared/components/info-blocks/my-feed-empty'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { getSession } from '@/shared/lib/auth'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import { getRelationIds } from '@/shared/utils/payload/getTypes'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Моя лента'
}

export default async function Feed() {
	const payload = await getPayload({ config: configPromise })
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		overrideAccess: true,
		depth: 2
	})

	// Извлекаем ID пользователей из follow
	const followedUserIds = (user.follow || []).map(user =>
		typeof user === 'object' ? user.id : user
	)

	// Извлекаем ID сообществ из followCommunities
	const followedCommunityIds = getRelationIds<FollowCommunity>(
		user.followCommunities?.docs
	)

	let feedIds: (string | number)[] = []

	// Получаем посты пользователей, на которых подписан текущий пользователь
	if (followedUserIds.length > 0) {
		const usersWithPosts = await payload.find({
			collection: 'users',
			where: {
				id: {
					in: followedUserIds
				}
			},
			overrideAccess: true,
			depth: 2 // Разворачиваем relatedPosts
		})

		const userPostIds = usersWithPosts.docs.flatMap(user =>
			getRelationIds<Post>(user.posts?.docs)
		)

		feedIds = [...feedIds, ...userPostIds]
	}

	// Получаем посты сообществ, на которые подписан текущий пользователь
	if (followedCommunityIds.length > 0) {
		const communitiesWithPosts = await payload.find({
			collection: 'communities',
			where: {
				id: {
					in: followedCommunityIds
				}
			},
			overrideAccess: true,
			depth: 2 // Разворачиваем posts
		})

		const communityPostIds = communitiesWithPosts.docs.flatMap(community =>
			getRelationIds<Post>(community.posts?.docs)
		)

		feedIds = [...feedIds, ...communityPostIds]
	}

	// Удаляем дубликаты из feedIds
	feedIds = [...new Set(feedIds)]

	const resultPosts = await payload.find({
		collection: 'posts',
		where: {
			id: {
				in: feedIds
			},
			_status: {
				equals: 'published'
			},
			hasDeleted: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true
	})

	if (!resultPosts || resultPosts.docs.length === 0) {
		return <MyFeedEmpty className='p-2 lg:p-0' />
	}

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const posts = resultPosts.docs as Post[]
	const communities = resultCommunities.docs as Community[]

	// Получаем права для каждого поста
	const postPermissions: Record<number, Permissions | null> = {}
	if (currentUser) {
		await Promise.all(
			posts.map(async post => {
				const communityId =
					post.community && typeof post.community === 'object'
						? post.community.id
						: null
				postPermissions[post.id] = communityId
					? await getUserPermissions(currentUser.id, communityId)
					: null
			})
		)
	}

	return (
		<>
			<PostForm
				limit={5}
				post={posts}
				communities={communities}
				postPermissions={postPermissions}
				// loading={loading}
			/>
		</>
	)
}

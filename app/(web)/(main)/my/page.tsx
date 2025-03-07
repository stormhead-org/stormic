import { Post, type User } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { MyFeedEmpty } from '@/shared/components/info-blocks/my-feed-empty'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

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
	
	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1,
	})
	
	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 1,
	})
	
	// Извлекаем ID пользователей из follow
	const followedUserIds = (user.follow || []).map((user) =>
		typeof user === 'object' ? user.id : user
	);
	
	// Извлекаем ID сообществ из followCommunities
	const followedCommunityIds = (user.followCommunities?.docs || []).map((community) => community.id);
	
	let feedIds: (string | number)[] = [];
	
	// Получаем посты пользователей, на которых подписан текущий пользователь
	if (followedUserIds.length > 0) {
		const usersWithPosts = await payload.find({
			collection: 'users',
			where: {
				id: {
					in: followedUserIds,
				},
			},
			depth: 1, // Разворачиваем relatedPosts
		});
		
		const userPostIds = usersWithPosts.docs.flatMap((user) =>
			(user.relatedPosts?.docs || []).map((post) => post.id)
		);
		feedIds = [...feedIds, ...userPostIds];
	}
	
	// Получаем посты сообществ, на которые подписан текущий пользователь
	if (followedCommunityIds.length > 0) {
		const communitiesWithPosts = await payload.find({
			collection: 'communities',
			where: {
				id: {
					in: followedCommunityIds,
				},
			},
			depth: 1, // Разворачиваем posts
		});
		
		const communityPostIds = communitiesWithPosts.docs.flatMap((community) =>
			(community.posts?.docs || []).map((post) => post.id)
		);
		feedIds = [...feedIds, ...communityPostIds];
	}
	
	// Удаляем дубликаты из feedIds
	feedIds = [...new Set(feedIds)];
	
	if (!feedIds || feedIds.length === 0) {
		return <MyFeedEmpty />;
	}
	const resultPosts = await payload.find({
		collection: 'posts',
		where: {
			id: {
				in: feedIds,
			},
		},
		depth: 1,
	});
	
	const posts = resultPosts.docs as Post[];
	
	return (
		<>
			<MainBannerForm
				stormicName={
					resultGlobalHost.title && String(resultGlobalHost.title)
				}
				bannerUrl={
					'banner' in resultGlobalHost &&
					typeof resultGlobalHost.banner === 'object' &&
					resultGlobalHost.banner !== null
						? resultGlobalHost.banner.url
						: ''
				}
			/>
			<PostForm
				limit={5}
				post={posts}
				className='mt-4'
				// loading={loading}
			/>
		</>
	)
}

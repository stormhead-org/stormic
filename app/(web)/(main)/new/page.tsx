import { Community, Post, User } from '@/payload-types'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { SortFreshFeedButtons } from '@/shared/components/sort-fresh-feed-buttons'
import { getSession } from '@/shared/lib/auth'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Свежее'
}

export default async function Home() {
	const payload = await getPayload({ config: configPromise })

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const result = await payload.find({
		collection: 'posts',
		where: {
			_status: {
				equals: 'published'
			},
			hasDeleted: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true,
		depth: 2
	})

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

	const posts = result.docs as Post[]
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
			<SortFreshFeedButtons />
			<PostForm
				limit={5}
				post={posts}
				communities={communities}
				postPermissions={postPermissions}
				className='lg:mt-3'
			/>
		</>
	)
}

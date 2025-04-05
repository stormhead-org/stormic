import { Community, Post, User } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { getSession } from '@/shared/lib/auth'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions' // Импортируем тип Permissions
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
		overrideAccess: true
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		overrideAccess: true
	})

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1
	})

	const posts = result.docs as Post[]

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

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<MainBannerForm
				stormicName={resultGlobalHost.title && String(resultGlobalHost.title)}
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
				communities={communities}
				postPermissions={postPermissions}
				className='mt-4'
			/>
		</>
	)
}

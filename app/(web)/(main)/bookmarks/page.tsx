import { Community, Post, type User } from '@/payload-types'
import { BookmarksEmpty } from '@/shared/components/info-blocks/bookmarks-empty'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { getSession } from '@/shared/lib/auth'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Закладки'
}

export default async function Bookmarks() {
	const payload = await getPayload({ config: configPromise })
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 1
	})

	const bookmarkIds = (user.bookmarks?.docs || [])
		.filter((post): post is Post => typeof post === 'object')
		.map(post => post.id)

	if (!bookmarkIds || bookmarkIds.length === 0) {
		return <BookmarksEmpty />
	}
	const resultPosts = await payload.find({
		collection: 'posts',
		where: {
			id: {
				in: bookmarkIds
			}
		},
		pagination: false,
		overrideAccess: true
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

	const posts = resultPosts.docs as Post[]
	const communities = resultCommunities.docs as Community[]

	// Получаем права для каждого поста
	const postPermissions: Record<number, Permissions | null> = {}

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

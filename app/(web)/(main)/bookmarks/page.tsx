import { Post, type User } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { BookmarksEmpty } from '@/shared/components/info-blocks/bookmarks-empty'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { UserBookmarksPostGroup } from '@/shared/components/posts/user-bookmarks-post-group'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

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
	
	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1,
	})
	
	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 1,
	})
	
	const bookmarkIds = (user.bookmarks?.docs || []).map((post) => post.id);
	if (!bookmarkIds || bookmarkIds.length === 0) {
		return <BookmarksEmpty />;
	}
	const resultPosts = await payload.find({
		collection: 'posts',
		where: {
			id: {
				in: bookmarkIds,
			},
		},
		depth: 1,
	});
	
	const posts = resultPosts.docs as Post[];
	
	return (
		<>
			<MainBannerForm
				stormicName={
					resultGlobalHost.hostTitle && String(resultGlobalHost.hostTitle)
				}
				bannerUrl={
					'hostBanner' in resultGlobalHost &&
					typeof resultGlobalHost.hostBanner === 'object' &&
					resultGlobalHost.hostBanner !== null
						? resultGlobalHost.hostBanner.url
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

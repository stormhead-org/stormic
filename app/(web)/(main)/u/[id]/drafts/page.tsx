import { Community, Post, User } from '@/payload-types'
import { PostDraftForm } from '@/shared/components/posts/drafts/post-draft-form'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Свежее'
}

export default async function PostDrafts() {
	const payload = await getPayload({ config: configPromise })

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const result = await payload.find({
		collection: 'posts',
		where: {
			author: {
				equals: currentUser.id
			},
			_status: {
				equals: 'draft'
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
		pagination: false,
		overrideAccess: true
	})

	const posts = result.docs as Post[]
	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<PostDraftForm post={posts} communities={communities} currentUser={currentUser} className='mt-4' />
		</>
	)
}

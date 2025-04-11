import type { Community, User } from '@/payload-types'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { PostDeleted } from '@/shared/components/info-blocks/post-deleted'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import { getSession } from '@/shared/lib/auth'
import { getRelationProp } from '@/shared/utils/payload/getTypes'
import PageClient from './page.client'

export default async function Post({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	if (!id || isNaN(Number(id))) {
		return <PostNotFound />
	}

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const payload = await getPayload({ config: configPromise })

	// const resultPost = await payload.find({
	// 	collection: 'posts',
	// 	overrideAccess: true,
	// 	where: {
	// 		id: {
	// 			equals: Number(id)
	// 		},
	// 		_status: {
	// 			equals: 'published'
	// 		}
	// 	}
	// })

	const post = await payload.findByID({
		collection: 'posts',
		id: id,
		overrideAccess: true
	})

	if (!post || post._status === 'draft') {
		return <PostNotFound />
	}

	if (post.hasDeleted === true) {
		return <PostDeleted />
	}

	const resultCommunities = await payload.find({
		collection: 'communities',
		overrideAccess: true
	})

	const communities = resultCommunities.docs as Community[]

	const communityId = getRelationProp<Community, 'id'>(post.community, 'id', 0)

	const permissions = currentUser
		? await getUserPermissions(currentUser.id, communityId)
		: null

	return (
		<article>
			<PageClient />
			{/* <div className='flex flex-col h-[91vh] overflow-auto no-scrollbar rounded-md'>
				<FullPostPage
					post={currentPost}
					communities={communities}
					permissions={permissions}
					currentUser={currentUser}
				/>
			</div> */}
			<FullPostPage
				post={post}
				communities={communities}
				permissions={permissions}
				currentUser={currentUser}
			/>
		</article>
	)
}

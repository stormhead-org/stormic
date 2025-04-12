import type { Community, User } from '@/payload-types'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { PostDeleted } from '@/shared/components/info-blocks/post-deleted'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import { getSession } from '@/shared/lib/auth'
import { getRelationProp } from '@/shared/utils/payload/getTypes'

interface PageProps {
	params: Promise<{ id: string }>;
}


export default async function Post({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise

	if (!id) {
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
			<FullPostPage
				post={post}
				communities={communities}
				permissions={permissions}
				currentUser={currentUser}
			/>
	)
}

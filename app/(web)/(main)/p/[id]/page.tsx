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
	params: Promise<{ id: string }>
}

export default async function Post({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise

	if (!id) {
		return <PostNotFound />
	}

	try {
		const session = (await getSession()) as { user: User } | null
		const currentUser = session && session.user

		const payload = await getPayload({ config: configPromise })

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

		const hostSettings = await payload.findGlobal({
			slug: 'host-settings',
			depth: 1
		})

		const communities = resultCommunities.docs as Community[]

		const communityId = getRelationProp<Community, 'id'>(
			post.community,
			'id',
			0
		)

		const permissions = currentUser
			? await getUserPermissions(currentUser.id, communityId)
			: null

		return (
			<FullPostPage
				post={post}
				communities={communities}
				host={hostSettings}
				permissions={permissions}
				currentUser={currentUser}
			/>
		)
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error'
		console.error(`Error loading post: ${errorMessage}`)
		return <PostNotFound />
	}
}

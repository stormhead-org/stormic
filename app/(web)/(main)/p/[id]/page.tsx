import type { Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
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

	const payload = await getPayload({ config: configPromise })
	const resultPost = await payload.find({
		collection: 'posts',
		overrideAccess: true,
		where: {
			id: {
				equals: Number(id)
			}
		}
	})
	const post = resultPost.docs as Post[]

	if (!post) {
		return <PostNotFound />
	}

	return (
		<article>
			<PageClient />
			<div className='flex flex-col h-[91vh] overflow-auto no-scrollbar rounded-md'>
				<FullPostPage post={post} />
			</div>
		</article>
	)
}

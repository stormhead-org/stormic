import type { Post } from '@/payload-types'
import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { LivePreviewListener } from '@/shared/components/LivePreviewListener'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import { generateMeta } from '@/shared/lib/generateMeta'
import PageClient from './page.client'

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	
		const payload = await getPayload({ config: configPromise })
		const resultPost = await payload.find({
			collection: 'posts',
			overrideAccess: true,
			where: {
				id: {
					equals: id
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

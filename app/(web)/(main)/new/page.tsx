import { Post } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Свежее',
}

export default async function Home() {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		depth: 1,
		overrideAccess: false,
	})

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1,
	})

	const posts = result.docs as Post[]

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

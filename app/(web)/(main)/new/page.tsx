import { Post } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Свежее'
}

export default async function Home() {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		overrideAccess: true
	})

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1
	})

	const posts = result.docs as Post[]

	return (
		<>
			<MainBannerForm
				stormicName={
					resultGlobalHost.title && String(resultGlobalHost.title)
				}
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
				className='mt-4'
				// loading={loading}
			/>
		</>
	)
}

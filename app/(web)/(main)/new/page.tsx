import { Post } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { MainPagePostGroup } from '@/shared/components/posts/main-page-post-group'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

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
		slug: 'host-settings', // required
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
			<MainPagePostGroup data={posts} className='mt-4' />
		</>
	)
}

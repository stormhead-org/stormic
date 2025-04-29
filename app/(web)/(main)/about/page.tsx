import { User } from '@/payload-types'
import { MainBannerForm } from '@/shared/components'
import { AboutForm } from '@/shared/components/simple-pages/about-form'
import { getSession } from '@/shared/lib/auth'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: О проекте'
}

export default async function About() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session?.user

	const payload = await getPayload({ config: configPromise })

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
	})

	const bannerUrl =
		typeof resultGlobalHost.banner === 'object'
			? getMediaUrl(resultGlobalHost.banner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	const ownerId = getRelationProp<User, 'id'>(resultGlobalHost.owner, 'id', 0)

	return (
		<>
			{/* Центральная часть */}
			<MainBannerForm
				stormicName={resultGlobalHost.title || 'Stormic'}
				bannerUrl={bannerUrl}
				className='m-2 lg:m-0'
			/>
			<AboutForm
				hostInfo={resultGlobalHost}
				hasOwner={currentUser && currentUser.id === ownerId}
				className='m-2 lg:m-0'
			/>
		</>
	)
}

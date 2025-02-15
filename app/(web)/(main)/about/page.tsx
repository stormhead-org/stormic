import { MainBannerForm } from '@/shared/components'
import { AboutPage } from '@/shared/components/simple-pages/about-page'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: О проекте',
}

export default async function About() {
	const payload = await getPayload({ config: configPromise })

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1,
	})

	return (
		<>
			{/* Центральная часть */}
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
				search={false}
			/>
			<AboutPage hostInfo={resultGlobalHost} />
		</>
	)
}

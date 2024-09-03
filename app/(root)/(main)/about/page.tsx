import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm } from '@/shared/components'
import { AboutPage } from '@/shared/components/simple-pages/about-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Stormic: О проекте'
}

export default async function About() {
	const stormicName = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'NAME'
		}
	})
	const banner = await prisma.stormicMedia.findFirst({
		where: {
			mediaType: 'BANNER'
		}
	})
	
	const owner = await prisma.user.findFirst({
		where: {
			role: 'OWNER'
		}
	})
	
	return (
		<>
			{/* Центральная часть */}
			<MainBannerForm stormicName={stormicName && String(stormicName.content)}
			                bannerUrl={banner && String(banner.url)}
			                search={false}
			/>
			<AboutPage owner={owner} />
		</>
	)
}

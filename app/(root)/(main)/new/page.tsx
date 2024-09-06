import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm } from '@/shared/components'
import { MainPagePostGroup } from '@/shared/components/posts/main-page-post-group'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Stormic: Свежее'
}

export default async function Home() {
	
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
	
	return (
		<>
			{/* Центральная часть */}
			<MainBannerForm stormicName={stormicName && String(stormicName.content)}
			                bannerUrl={banner && String(banner.url)} />
			<MainPagePostGroup className='mt-4' />
		</>
	)
}

import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm } from '@/shared/components/'
import { MainPagePostGroup } from '@/shared/components/posts/main-page-post-group'

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
			<MainBannerForm stormicName={stormicName} bannerUrl={banner} />
			<MainPagePostGroup className='mt-4' />
		</>
	)
}

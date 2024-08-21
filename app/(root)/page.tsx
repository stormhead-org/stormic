import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm, SortFeedButtons } from '@/shared/components/'

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
			<SortFeedButtons className='mt-[7px]' />
		</>
	)
}

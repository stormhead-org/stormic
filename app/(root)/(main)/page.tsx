import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm, SortFeedButtons } from '@/shared/components'
import { redirect } from 'next/navigation'

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
	
	return redirect('/new')
	
	// return (
	// 	<>
	// 		{/* Центральная часть */}
	// 		<MainBannerForm stormicName={stormicName && String(stormicName.content)}
	// 		                bannerUrl={banner && String(banner.url)} />
	// 		<SortFeedButtons className='mt-4' />
	// 	</>
	// )
}

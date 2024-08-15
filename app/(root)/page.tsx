import { prisma } from '@/prisma/prisma-client'
import {
	MainBannerForm,
	SortFeedButtons,
} from '@/shared/components/'

export default async function Home() {
	
	const stormicName = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'NAME'
		}
	})
	const banner = await prisma.stormicMedia.findFirst({
		where: {
			mediaType: 'BANNER'
		},
	})
	
	return (
		<>
					{/* Центральная часть */}
					<div className='w-2/4'>
						<MainBannerForm stormicName={stormicName} bannerUrl={banner} />
						<SortFeedButtons className='mt-[7px]' />
					</div>
</>
	)
}

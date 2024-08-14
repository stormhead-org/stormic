import { prisma } from '@/prisma/prisma-client'
import {
	Container,
	FeedUserMenu,
	MainBannerForm,
	NewPostButton,
	NavigationMenuForm,
	SideFooter,
	SocialMenu,
	SortFeedButtons,
	Title,
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
	const menu = await prisma.navigationMenu.findMany()

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-[300px]'>
						<FeedUserMenu />
						<SocialMenu className='my-2' />
						<NewPostButton className='my-4' />
						<NavigationMenuForm className='mt-4' data={menu} />
						<SideFooter className='my-4' />
					</div>

					{/* Центральная часть */}
					<div className='flex-1'>
						<MainBannerForm stormicName={stormicName} bannerUrl={banner} />
						<SortFeedButtons className='mt-[7px]' />
					</div>

					{/* Правая часть */}
					<div className='w-[300px] bg-red-800'>
						<Title
							text='Сейчас обсуждают'
							size='sm'
							className='font-extrabold'
						/>
						<p>Комментарии</p>
					</div>
				</div>
			</Container>
		</>
	)
}

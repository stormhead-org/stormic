'use client'

import {
	Community,
	type HostSetting,
	SidebarNavigation,
	SocialNavigation,
	type User
} from '@/payload-types'
import { Container, HeaderButtons, HeaderUserBar } from '@/shared/components'
import { MobileSidebarCommunitySettings } from '@/shared/components/mobile/mobile-sidebar-community-settings'
import { MobileSidebarUserSettings } from '@/shared/components/mobile/mobile-sidebar-user-settings'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { MobileSidebar } from '../../mobile/mobile-sidebar'
import { SidebarProvider, SidebarTrigger } from '../../ui/sidebar-tablet'

interface Props {
	hostSettings: HostSetting
	communities: Community[]
	sideBarNavigation: SidebarNavigation
	socialNavigation: SocialNavigation
	currentUser?: User
	className?: string
}

export const Header: React.FC<Props> = ({
	hostSettings,
	communities,
	sideBarNavigation,
	socialNavigation,
	currentUser,
	className
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	// Функция для извлечения communityId из пути
	const getCommunityIdFromPath = (path: string | null): string | undefined => {
		if (!path) return undefined
		const match = path.match(/^\/settings\/community\/([^/]+)(\/|$)/)
		return match ? match[1] : undefined
	}

	const communityId = getCommunityIdFromPath(pathname)

	const sidebarRoutes = [
		{
			prefix: '/settings/user/',
			component: <MobileSidebarUserSettings className='lg:hidden' />
		},
		{
			prefix: '/settings/community/',
			component: (
				<MobileSidebarCommunitySettings
					communityId={communityId || ''}
					className='lg:hidden'
				/>
			)
		},
		{
			prefix: '',
			component: (
				<MobileSidebar
					communities={communities}
					sideBarNavigation={sideBarNavigation}
					socialNavigation={socialNavigation}
					className='lg:hidden'
				/>
			)
		}
	]

	const selectedSidebar =
		pathname !== null
			? sidebarRoutes.find(route => pathname.startsWith(route.prefix))
					?.component
			: sidebarRoutes[sidebarRoutes.length - 1].component

	React.useEffect(() => {
		let toastMessage = ''

		if (searchParams?.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000
				})
			}, 1000)
		}
	}, [])

	const logoImageUrl =
		typeof hostSettings.logo === 'object'
			? getMediaUrl(hostSettings.logo, '/logo.png')
			: '/logo.png'

	return (
		<header
			className={cn(
				'sticky top-0 pt-2 z-10 bg-background lg:mx-0 lg:pt-0 lg:bg-transparent lg:border-b lg:border-primary/5',
				className
			)}
		>
			<Container>
				<div className='flex items-center justify-between h-[4rem] mx-2 lg:mx-0 bg-secondary lg:bg-transparent border-b border-primary/5 lg:border-none rounded-xl lg:rounded-none'>
					<SidebarProvider>
						{selectedSidebar}
						{/* Левая часть */}
						<div className='w-1/2 lg:w-1/4 flex items-center'>
							<SidebarTrigger className='block lg:hidden mx-2 -mt-1 text-foreground' />
							<Link href='/'>
								<div className='flex items-center gap-2 lg:gap-4 w-full lg:w-[250px]'>
									<img src={logoImageUrl} alt='Logo' width={42} height={42} />
									<div>
										<h1 className='text-2xl uppercase font-black text-foreground'>
											{hostSettings.title || 'Stormic'}
										</h1>
										{hostSettings.description && (
											<p className='text-sm text-foreground leading-3 mb-1'>
												{hostSettings.description}
											</p>
										)}
									</div>
								</div>
							</Link>
						</div>

						{/* Центральная */}
						<div className='hidden lg:block lg:w-2/4'>
							<HeaderButtons className='w-full' />
						</div>

						{/* Правая часть */}
						<div className='flex items-center w-1/2 lg:w-1/4 gap-3 justify-end'>
							<HeaderUserBar
								currentUser={currentUser}
								hostSettings={hostSettings}
								communities={communities}
								className='mr-2 lg:mr-0'
							/>
						</div>
					</SidebarProvider>
				</div>
			</Container>
		</header>
	)
}

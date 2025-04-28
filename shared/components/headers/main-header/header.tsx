'use client'

import {
	Community,
	type HostSetting,
	SidebarNavigation,
	SocialNavigation,
	type User
} from '@/payload-types'
import { Container, HeaderButtons, HeaderUserBar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
				'sticky top-0 pt-2 z-10 bg-background lg:mx-0 lg:pt-0 lg:bg-transparent lg:border-b lg:border-theme',
				className
			)}
		>
			<Container>
				<div className='flex items-center justify-between h-[4rem] mx-2 lg:mx-0 bg-secondary lg:bg-transparent border-b border-theme lg:border-none rounded-xl lg:rounded-none'>
					<SidebarProvider>
						<MobileSidebar
							communities={communities}
							sideBarNavigation={sideBarNavigation}
							socialNavigation={socialNavigation}
							className='lg:hidden'
						/>
						{/* Левая часть */}
						<div className='w-1/4 flex items-center'>
							<SidebarTrigger className='block lg:hidden mx-2 -mt-1' />
							<Link href='/'>
								<div className='lg:flex lg:items-center lg:gap-4 lg:w-[250px]'>
									<img
										src={logoImageUrl}
										alt='Logo'
										width={42}
										height={42}
										className=''
									/>
									<div className='hidden lg:block'>
										<h1 className='text-2xl uppercase font-black text-gray-700 dark:text-white'>
											{hostSettings.title || 'Stormic'}
										</h1>
										<p className='text-sm text-gray-700 dark:text-white leading-3 mb-1'>
											{hostSettings.description || 'код, GitHub и ты'}
										</p>
									</div>
								</div>
							</Link>
						</div>

						{/* Центральная */}
						<div className='hidden lg:block lg:w-2/4'>
							<HeaderButtons className='w-full' />
						</div>

						{/* Правая часть */}
						<div className='hidden lg:flex lg:items-center lg:gap-3 lg:w-1/4 lg:justify-end'>
							<HeaderUserBar
								currentUser={currentUser}
								hostSettings={hostSettings}
								communities={communities}
							/>
						</div>
					</SidebarProvider>
				</div>
			</Container>
		</header>
	)
}

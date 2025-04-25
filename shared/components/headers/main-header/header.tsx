'use client'

import { Container, HeaderButtons, HeaderUserBar } from '@/shared/components'
import { FormInput } from '@/shared/components/form'
import { MetaSidebar } from '@/shared/components/post-edit/items/meta-sidebar'
import { Button } from '@/shared/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	avatarImage: string | null | undefined
	userUrl: string
	logoImage: string | null | undefined
	stormicName: string | null | undefined
	authImage?: string | null | undefined
	session: boolean
	description: string | null | undefined
	className?: string
}

export const Header: React.FC<Props> = ({
	avatarImage,
	userUrl,
	logoImage,
	session,
	stormicName,
	authImage,
	description,
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

	return (
		<header
			className={cn(
				'sticky top-0 pt-2 z-10 bg-background lg:mx-0 lg:pt-0 lg:bg-transparent lg:border-b lg:border-blue-700',
				className
			)}
		>
				<Container>
					<div className='flex items-center justify-between h-[4rem] mx-2 lg:mx-0 bg-secondary lg:bg-transparent border-b border-blue-700 lg:border-none rounded-md lg:rounded-none'>
						{/* Левая часть */}
						<SidebarProvider>
							<div className='flex h-full w-full'>
								<MetaSidebar
									authorName={currentUser.name}
									authorAvatar={authorAvatar}
									communities={communities}
									selectedCommunityId={selectedCommunityId}
									setSelectedCommunityId={setSelectedCommunityId}
									heroImage={heroImage}
									setHeroImage={setHeroImage}
									seotitle={seotitle}
									setSeoTitle={setSeoTitle}
									seodescription={seodescription}
									setSeoDescription={setSeoDescription}
									seoImage={seoImage}
									setSeoImage={setSeoImage}
									className='w-64 flex-shrink-0'
								/>
								<SidebarTrigger className='' />
								
							</div>
						</SidebarProvider>
						<Link href='/'>
							<div className='lg:flex lg:items-center lg:gap-4 lg:w-[250px]'>
								<img
									src={logoImage || ''}
									alt='Logo'
									width={42}
									height={42}
									className='ml-2 lg:ml-0'
								/>
								<div className='hidden lg:block'>
									<h1 className='text-2xl uppercase font-black text-gray-700 dark:text-white'>
										{stormicName}
									</h1>
									<p className='text-sm text-gray-700 dark:text-white leading-3 mb-1'>
										{description}
									</p>
								</div>
							</div>
						</Link>
						
						{/* Центральная */}
						<div className='hidden lg:block lg:w-[500px]'>
							<HeaderButtons />
						</div>
						
						{/* Правая часть */}
						<div className='hidden lg:flex lg:items-center lg:gap-3 lg:w-[250px] lg:justify-end'>
							<HeaderUserBar
								session={session}
								avatarImage={avatarImage || ''}
								userUrl={userUrl}
								logoImage={logoImage || ''}
								authImage={authImage || ''}
								stormicName={stormicName || ''}
							/>
						</div>
					</div>
				</Container>
		</header>
	)
}

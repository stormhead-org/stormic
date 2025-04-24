'use client'

import { Container, HeaderButtons, HeaderUserBar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
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
				'sticky bg-background lg:bg-transparent top-0 border-b border-blue-700 z-10',
				className
			)}
		>
			<Container className='flex items-center justify-between h-[4rem]'>
				{/* Левая часть */}
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
			</Container>
		</header>
	)
}

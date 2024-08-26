'use client'

import { Container, HeaderButtons, HeaderUserBar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
	avatarImage: string
	userUrl: string
	logoImage: string
	stormicName: string
	description: string
	className?: string
}

export const Header: React.FC<Props> = ({
	                                        avatarImage,
	                                        userUrl,
	                                        logoImage,
	                                        stormicName,
	                                        description,
	                                        className
                                        }) => {
	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-4'>
				{/* Левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4 w-[250px]'>
						<img src={logoImage} alt='Logo' width={42} height={42} />
						<div>
							<h1 className='text-2xl uppercase font-black'>{stormicName}</h1>
							<p className='text-sm text-gray-400 leading-3'>
								{description}
							</p>
						</div>
					</div>
				</Link>
				
				{/* Центральная */}
				<div className='w-[500px]'>
					<HeaderButtons />
				</div>
				
				{/* Правая часть */}
				<div className='flex items-center gap-3 w-[250px] justify-end'>
					<HeaderUserBar avatarImage={avatarImage} userUrl={userUrl} />
				</div>
			</Container>
		</header>
	)
}

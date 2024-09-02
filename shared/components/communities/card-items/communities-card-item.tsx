'use client'

import { ProfileAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Component, Newspaper, Send, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

export interface CommunitiesCardItemProps {
	image?: string
	name: string
	description: string
	url?: string
	postCount: number
	followersCount: number
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommunitiesCardItem: React.FC<CommunitiesCardItemProps> = ({
	                                                                        image,
	                                                                        name,
	                                                                        description,
	                                                                        url,
	                                                                        postCount,
	                                                                        followersCount,
	                                                                        className
                                                                        }) => {
	const { formatMessage } = useIntl()
	const truncatedName = truncateText(name, 26)
	const truncatedDescription = truncateText(description, 26)
	return (
		<div className={cn('bg-secondary rounded-md', className)}>
			<div className='h-full flex'>
				<div className='w-10/12 p-4'>
					<div className='flex'>
						<Link href={String(url)}>
							<div className='flex gap-4'>
								<ProfileAvatar
									className='w-16 h-16 border-none bg-secondary hover:bg-secondary'
									avatarImage={String(image)}
									avatarSize={Number(64)} />
								<div className='flex h-full my-auto'>
									<div>
										<p className='font-bold text-md'>
											{truncatedName}
										</p>
										<p className='mt-1'>
											{truncatedDescription}
										</p>
									</div>
								</div>
							</div>
						
						</Link>
					</div>
					<div className='flex items-center border-t-2 border-t-blue-700 mt-4 w-full pt-3'>
						<div className='flex gap-8 w-1/2'>
							<div className='flex gap-2 items-center'>
								<p className='font-bold'>{postCount}</p>
								<Newspaper size={20} />
							</div>
							<div className='flex gap-2 items-center'>
								<p className='font-bold'>{followersCount}</p>
								<UserRoundPlus size={20} />
							</div>
						</div>
						<div className='flex justify-end w-1/2'>
							<Button
								variant='blue'
								className='h-6 w-26 text-sm font-bold mt-auto'
								type='button'
								// onClick={() => router.push('/write')}
							>
								{formatMessage({ id: 'profileHeader.profileSubscribeButton' })}
							</Button>
						</div>
					</div>
				</div>
				<div className='w-2/12 h-full  bg-primary/5 rounded-r-md'>
					<div className='flex group w-full h-1/2 hover:bg-secondary rounded-r-md cursor-pointer'>
						<Component
							className='cursor-pointer rounded-md bg-secondary group-hover:bg-primary/5 w-14 h-14 p-4 m-auto' />
					</div>
					<div className='flex group w-full h-1/2 hover:bg-secondary rounded-r-md cursor-pointer'>
						<Send className='cursor-pointer rounded-md bg-secondary group-hover:bg-primary/5 w-14 h-14 p-4 m-auto' />
					</div>
				</div>
			</div>
		</div>
	)
}


'use client'

import { ProfileAvatar } from '@/shared/components'
import CommunityFollowButton from '@/shared/components/community-follow-button'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { CategoryFollowersCounter } from '@/shared/stores/state-counters/community-followers-counter'
import { Component, Newspaper, UserRoundPlus, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface CommunitiesCardItemProps {
	categoryId: number
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
	                                                                        categoryId,
	                                                                        image,
	                                                                        name,
	                                                                        description,
	                                                                        url,
	                                                                        postCount,
	                                                                        className
                                                                        }) => {
	const router = useRouter()
	const truncatedName = truncateText(name, 26)
	const truncatedDescription = truncateText(description, 26)
	return (
		<div className={cn('bg-secondary rounded-md', className)}>
			<div className='h-full flex'>
				<div className='w-10/12 p-4'>
					<Link href={String(url)}>
						<div className='flex'>
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
						</div>
					</Link>
					<div className='flex items-center border-t-2 border-t-blue-700 mt-4 w-full pt-3'>
						<div className='flex gap-8 w-1/2'>
							<div className='flex gap-2 items-center'>
								<p className='font-bold'>{postCount}</p>
								<Newspaper size={20} />
							</div>
							<div className='flex gap-2 items-center'>
								<CategoryFollowersCounter categoryId={categoryId || 0} />
								<UserRoundPlus size={20} />
							</div>
						</div>
						<div className='flex justify-end w-1/2'>
							<CommunityFollowButton categoryId={categoryId} />
						</div>
					</div>
				</div>
				<div className='w-2/12 h-full  bg-primary/5 rounded-r-md'>
					<div className='flex group w-full h-1/2 hover:bg-secondary rounded-r-md cursor-pointer'>
						<Button
							variant='secondary'
							type='button'
							disabled={false}
							className='h-14 w-14 m-auto group-hover:bg-primary/5 group-hover:text-blue-700 text-primary rounded-full'
							onClick={() => router.push(String(url))}
						>
							<UsersRound />
						</Button>
					</div>
					<div className='flex group w-full h-1/2 rounded-r-md'>
						<Button
							variant='secondary'
							type='button'
							disabled={true}
							className='h-14 w-14 m-auto text-primary rounded-full'
							// onClick={() => router.push(String(url))}
						>
							<Component />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

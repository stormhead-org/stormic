'use client'

import { ProfileAvatar } from '@/shared/components'
import CommunityFollowButton from '@/shared/components/community-follow-button'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { CommunityFollowersCounter } from '@/shared/stores/state-counters/community-followers-counter'
import { CommunityPostsCounter } from '@/shared/stores/state-counters/community-posts-counter'
import { Newspaper, UserRoundPlus, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface CommunitiesCardItemProps {
	communityId: number
	name: string
	description: string | null | undefined
	url?: string
	image?: string
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommunitiesCardItem: React.FC<CommunitiesCardItemProps> = ({
	communityId,
	image,
	name,
	description,
	url,
	className
}) => {
	const router = useRouter()
	const truncatedName = truncateText(name, 26)
	const truncatedDescription = truncateText(description || '', 26)
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
									avatarSize={Number(64)}
								/>
								<div className='flex h-full my-auto'>
									<div>
										<p className='font-bold text-md text-black dark:text-white'>
											{truncatedName}
										</p>
										<p className='mt-1 text-black dark:text-white'>
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
								<CommunityPostsCounter communityId={communityId || 0} />
								<Newspaper size={20} />
							</div>
							<div className='flex gap-2 items-center'>
								<CommunityFollowersCounter communityId={communityId || 0} />
								<UserRoundPlus size={20} />
							</div>
						</div>
						<div className='flex justify-end w-1/2'>
							<CommunityFollowButton communityId={communityId} />
						</div>
					</div>
				</div>
				<div className='w-2/12 h-full  bg-primary/5 rounded-r-md'>
					<div className='flex h-full group hover:bg-gray-800 rounded-r-md cursor-pointer items-center'>
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
					{/* <div className='flex group w-full h-1/2 rounded-r-md'>
						<Button
							variant='secondary'
							type='button'
							disabled={true}
							className='h-14 w-14 m-auto text-primary rounded-full'
							// onClick={() => router.push(String(url))}
						>
							<Component />
						</Button>
					</div> */}
				</div>
			</div>
		</div>
	)
}

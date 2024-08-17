'use client'

import { ProfileBody } from '@/shared/components/profiles/profile-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/profile-items/profile-header'
import { FeedToggle } from '@/shared/components/ui/feed-toggle'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileBanner?: string
	userAvatar?: string
	userName: string
	userBio?: string
	userRep: number
	userRegTime: string
	userSubscribes: number
	userSub: number
	className?: string
}

export const ProfileItem: React.FC<Props> = ({
	                                             profileBanner,
	                                             userAvatar,
	                                             userName,
	                                             userBio,
	                                             userRep,
	                                             userRegTime,
	                                             userSubscribes,
	                                             userSub,
	                                             className
                                             }) => {
	
	
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader profileBanner={profileBanner} userName={userName} userRegTime={userRegTime}
				               userRep={userRep}
				               userAvatar={userAvatar}
				/>
				<ProfileBody userSub={userSub} userSubscribes={userSubscribes} userBio={userBio} />
			</div>
			<div className='ml-6 mt-1 -mb-3'>
				<FeedToggle />
			</div>
		</div>
	)
}

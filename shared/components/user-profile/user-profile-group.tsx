'use client'

import { FeedToggle } from '@/shared/components/ui/feed-toggle'
import { UserProfileBody } from '@/shared/components/user-profile/user-profile-body'
import { UserProfileHeader } from '@/shared/components/user-profile/user-profile-header'
import { UserProfilePosts } from '@/shared/components/user-profile/user-profile-posts'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileBanner: string
	userAvatar?: string
	userName: string
	userBio?: string
	userRep: number
	userRegTime: string
	userSubscribes: number
	userSub: number
	userId: string
	className?: string
}

export const UserProfileGroup: React.FC<Props> = ({
	                                                  profileBanner,
	                                                  userAvatar,
	                                                  userName,
	                                                  userBio,
	                                                  userRep,
	                                                  userRegTime,
	                                                  userSubscribes,
	                                                  userSub,
	                                                  userId,
	                                                  className
                                                  }) => {
	
	
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<UserProfileHeader profileBanner={profileBanner} userName={userName} userRegTime={userRegTime} userRep={userRep}
				                   userAvatar={userAvatar} />
				<UserProfileBody userSub={userSub} userSubscribes={userSubscribes} userBio={userBio} />
			</div>
			<div className='ml-6 mt-1 -mb-3'>
				<FeedToggle />
			</div>
			<UserProfilePosts
				userId={String(userId)}
				className='mt-1' />
		</div>
	)
}

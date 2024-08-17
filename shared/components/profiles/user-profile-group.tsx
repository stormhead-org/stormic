'use client'

import { UserProfilePostGroup } from '@/shared/components/posts/user-profile-post-group'
import { ProfileItem } from '@/shared/components/profiles/profile-items/profile-item'
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
			<ProfileItem
				profileBanner={profileBanner}
				userAvatar={userAvatar}
				userName={userName}
				userBio={userBio}
				userRep={userRep}
				userRegTime={userRegTime}
				userSubscribes={userSubscribes}
				userSub={userSub}
			/>
			<UserProfilePostGroup
				userId={String(userId)}
				className='mt-1' />
		</div>
	)
}

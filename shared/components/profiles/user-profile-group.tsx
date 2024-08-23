'use client'

import { UserProfilePostGroup } from '@/shared/components/posts/user-profile-post-group'
import { ProfileItem } from '@/shared/components/profiles/profile-items/profile-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileBanner?: string
	profileAvatar?: string
	profileName: string
	profileDescription?: string
	profileRep: number
	profileRegTime: string
	profileFollowers: number
	profileFollowing: number
	userId: string
	className?: string
}

export const UserProfileGroup: React.FC<Props> = ({
	                                                  profileBanner,
	                                                  profileAvatar,
	                                                  profileName,
	                                                  profileDescription,
	                                                  profileRep,
	                                                  profileRegTime,
	                                                  profileFollowers,
	                                                  profileFollowing,
	                                                  userId,
	                                                  className
                                                  }) => {
	
	
	return (
		<div className={cn('', className)}>
			<ProfileItem
				profileBanner={profileBanner}
				profileAvatar={profileAvatar}
				profileName={profileName}
				profileDescription={profileDescription}
				profileRep={profileRep}
				profileRegTime={profileRegTime}
				profileFollowers={profileFollowers}
				profileFollowing={profileFollowing}
				userId={userId}
				hasUser={true}
			/>
			<UserProfilePostGroup
				userId={String(userId)}
				className='mt-1' />
		</div>
	)
}

'use client'

import { ProfileBody } from '@/shared/components/profiles/profile-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/profile-items/profile-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileBanner?: string
	profileAvatar?: string
	profileName: string
	profileDescription?: string
	profileRep?: number
	profileRegTime?: string
	profileFollowers: number
	profileFollowing?: number
	hasUser: boolean
	className?: string
}

export const ProfileItem: React.FC<Props> = ({
	                                             profileBanner,
	                                             profileAvatar,
	                                             profileName,
	                                             profileDescription,
	                                             profileRep,
	                                             profileRegTime,
	                                             profileFollowers,
	                                             profileFollowing,
	                                             hasUser,
	                                             className
                                             }) => {
	
	
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader profileBanner={profileBanner} profileName={profileName} profileRegTime={profileRegTime}
				               profileRep={profileRep}
				               profileAvatar={profileAvatar}
				               hasUser={hasUser} />
				<ProfileBody profileFollowing={profileFollowing}
				             profileFollowers={profileFollowers}
				             profileDescription={profileDescription}
				             hasUser={hasUser} />
			</div>
		</div>
	)
}

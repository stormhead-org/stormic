'use client'

import { ProfileBody } from '@/shared/components/profiles/profile-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/profile-items/profile-header'
import { FeedToggle } from '@/shared/components/ui/feed-toggle'
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
	                                             className
                                             }) => {
	
	
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader profileBanner={profileBanner} profileName={profileName} profileRegTime={profileRegTime}
				               profileRep={profileRep}
				               profileAvatar={profileAvatar}
				/>
				<ProfileBody profileFollowing={profileFollowing} profileFollowers={profileFollowers}
				             profileDescription={profileDescription} />
			</div>
			<div className='ml-6 mt-1 -mb-3'>
				<FeedToggle />
			</div>
		</div>
	)
}

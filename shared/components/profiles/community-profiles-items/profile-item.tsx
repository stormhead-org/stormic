'use client'

import { ProfileBody } from '@/shared/components/profiles/community-profiles-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/community-profiles-items/profile-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	userId?: string
	categoryId?: string
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
	                                             userId,
	                                             categoryId,
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
				<ProfileHeader
					userId={Number(userId)}
					categoryId={Number(categoryId)}
					profileBanner={profileBanner}
				  profileName={profileName}
				  profileRep={profileRep}
				  profileAvatar={profileAvatar}
				  hasUser={hasUser}
				/>
				<ProfileBody
					userId={Number(userId)}
					categoryId={Number(categoryId)}
					profileFollowing={profileFollowing}
				  profileFollowers={profileFollowers}
				  profileDescription={profileDescription}
				  profileRegTime={profileRegTime}
				  hasUser={hasUser}
				/>
			</div>
		</div>
	)
}

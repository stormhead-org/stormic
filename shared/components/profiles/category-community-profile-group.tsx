'use client'

import { CategoryProfilePostGroup } from '@/shared/components/posts/category-profile-post-group'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
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
	categoryId: string
	className?: string
}

export const CategoryCommunityProfileGroup: React.FC<Props> = ({
	                                                               profileBanner,
	                                                               profileAvatar,
	                                                               profileName,
	                                                               profileDescription,
	                                                               profileRep,
	                                                               profileRegTime,
	                                                               profileFollowers,
	                                                               profileFollowing,
	                                                               categoryId,
	                                                               className
                                                               }) => {
	
	
	return (
		<div className={cn('', className)}>
			<ProfileItem
				categoryId={categoryId}
				profileBanner={profileBanner}
				profileAvatar={profileAvatar}
				profileName={profileName}
				profileDescription={profileDescription}
				profileRep={profileRep}
				profileRegTime={profileRegTime}
				profileFollowers={profileFollowers}
				profileFollowing={profileFollowing}
				hasUser={false}
			/>
			<CategoryProfilePostGroup
				categoryId={String(categoryId)}
				className='mt-1' />
		</div>
	)
}

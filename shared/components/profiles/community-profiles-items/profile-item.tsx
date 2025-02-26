'use client'

import { Community, User } from '@/payload-types'
import { ProfileBody } from '@/shared/components/profiles/community-profiles-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/community-profiles-items/profile-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: User | Community
	hasUser: boolean
	className?: string
}

export const ProfileItem: React.FC<Props> = ({ data, hasUser, className }) => {
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader
					userId={Number(data.id)}
					communityId={Number(data.id)}
					profileBanner={
						'userBanner' in data &&
						typeof data.userBanner === 'object' &&
						data.userBanner !== null
							? data.userBanner.url
							: 'communityBanner' in data &&
							  typeof data.communityBanner === 'object' &&
							  data.communityBanner !== null
							? data.communityBanner.url
							: undefined
					}
					profileAvatar={
						'userAvatar' in data &&
						typeof data.userAvatar === 'object' &&
						data.userAvatar !== null
							? data.userAvatar.url
							: 'communityLogo' in data &&
							  typeof data.communityLogo === 'object' &&
							  data.communityLogo !== null
							? data.communityLogo.url
							: undefined
					}
					profileName={
						'name' in data ? data.name : (data as Community).title || '#'
					}
					profileRep={0}
					hasUser={hasUser}
				/>
				<ProfileBody data={data} hasUser={hasUser} />
			</div>
		</div>
	)
}

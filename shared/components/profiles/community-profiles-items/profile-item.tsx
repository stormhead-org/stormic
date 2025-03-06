'use client'

import { Community, User } from '@/payload-types'
import { ProfileBody } from '@/shared/components/profiles/community-profiles-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/community-profiles-items/profile-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: User | Community
	currentUser: User
	hasUser: boolean
	className?: string
}

export const ProfileItem: React.FC<Props> = ({
	data,
	currentUser,
	hasUser,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader
					data={data}
					currentUser={currentUser}
					hasUser={hasUser}
				/>
				<ProfileBody data={data} hasUser={hasUser} />
			</div>
		</div>
	)
}

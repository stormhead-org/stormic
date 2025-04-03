'use client'

import { Community, User } from '@/payload-types'
import { ProfileBody } from '@/shared/components/profiles/community-profiles-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/community-profiles-items/profile-header'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: User | Community
	permissions: Permissions | null
	hasUser: boolean
	className?: string
}

export const ProfileItem: React.FC<Props> = ({
	data,
	permissions,
	hasUser,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				<ProfileHeader
					data={data}
					permissions={permissions}
					hasUser={hasUser}
				/>
				<ProfileBody data={data} hasUser={hasUser} />
			</div>
		</div>
	)
}

'use client'

import { Community, User } from '@/payload-types'
import { ProfileCustomField } from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-form'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: User | Community
	className?: string
}

export const ProfileCustomFieldForm: React.FC<Props> = ({
	data,
	className,
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileCustomField
				items={
					'tableUserInfo' in data && Array.isArray(data.tableUserInfo)
						? data.tableUserInfo
						: 'tableCommunityInfo' in data &&
						  Array.isArray(data.tableCommunityInfo)
						? data.tableCommunityInfo
						: []
				}
			/>
		</div>
	)
}

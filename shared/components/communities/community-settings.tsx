'use client'

import { Community } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { SettingsCommunityForm } from '../modals/communities/settings/forms/settings-community-form'

interface Props {
	data: Community
	className?: string
}

export const CommunitySettings: React.FC<Props> = ({ data, className }) => {
	return (
		<div className={cn('', className)}>
			<SettingsCommunityForm community={data} />
		</div>
	)
}

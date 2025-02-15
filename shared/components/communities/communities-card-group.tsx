'use client'

import { Community } from '@/payload-types'
import { CommunitiesCardForm } from '@/shared/components/communities/card-items/communities-card-form'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: Community[]
	className?: string
}

export const CommunitiesCardGroup: React.FC<Props> = ({ data, className }) => {
	return (
		<div className={cn('', className)}>
			<CommunitiesCardForm data={data} />
		</div>
	)
}

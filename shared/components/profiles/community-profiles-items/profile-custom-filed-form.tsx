'use client'

import { ProfileCustomFieldItem } from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-item'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface Item {
	label: string
	value: string
}

interface Props {
	items: Item[]
	loading?: boolean
	className?: string
}

export const ProfileCustomField: React.FC<Props> = ({
	items,
	loading,
	className,
}) => {
	if (loading) {
		return <Skeleton className='h-6 my-2 rounded-[8px]' />
	}

	return (
		<div className={cn('', className)}>
			{items.map((item, index) => (
				<ProfileCustomFieldItem
					key={index}
					fieldsKey={item.label}
					fieldsValue={item.value}
				/>
			))}
		</div>
	)
}

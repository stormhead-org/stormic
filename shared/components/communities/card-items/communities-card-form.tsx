'use client'

import {
	CommunitiesCardItem,
	type CommunitiesCardItemProps
} from '@/shared/components/communities/card-items/communities-card-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'
import { Skeleton } from '../../ui/skeleton'

type Item = CommunitiesCardItemProps

interface Props {
	items: Item[]
	loading?: boolean
	className?: string
}

export const CommunitiesCardForm: React.FC<Props> = ({
	                                                     items,
	                                                     className,
	                                                     loading
                                                     }) => {
	const { formatMessage } = useIntl()
	
	if (loading) {
		return <>
			<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
			<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
			<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
			<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
			<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
		</>
	}
	
	return (
		<div className={cn('', className)}>
			<div className='grid grid-cols-2 gap-4'>
				{items.map((item, index) => (
					<CommunitiesCardItem
						key={index}
						image={item.image}
						name={item.name}
						description={item.description}
						url={item.url}
						postCount={item.postCount}
						followersCount={item.followersCount}
					/>
				))}
			</div>
		</div>
	)
}

'use client'

import { CommunitiesCardItem } from '@/shared/components/communities/card-items/communities-card-item'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import React from 'react'
// import { useIntl } from 'react-intl'
import { Community } from '@/payload-types'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	data: Community[]
	loading?: boolean
	className?: string
}

export const CommunitiesCardForm: React.FC<Props> = ({
	data,
	className,
	loading
}) => {
	// const { formatMessage } = useIntl()

	if (loading) {
		return (
			<>
				<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
				<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
				<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
				<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
				<Skeleton className='w-96 h-6 mb-4 rounded-[8px]' />
			</>
		)
	}

	return (
		<div className={cn('', className)}>
			<div className='mx-2 lg:mx-0 grid grid-cols-1 lg:grid-cols-2 gap-2'>
				{data.map((item, index) => (
					<CommunitiesCardItem
						key={index}
						communityId={item.id}
						image={getMediaUrl(item.logo, 'medium', '/logo.png')}
						name={item.title}
						description={item.description}
						url={`/c/${item.id}`}
					/>
				))}
			</div>
		</div>
	)
}

'use client'

import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import React from 'react'
// import { useIntl } from 'react-intl'
import { User } from '@/payload-types'
import { Skeleton } from '../../ui/skeleton'
import { UsersCardItem } from './users-card-item'

interface Props {
	data: User[]
	loading?: boolean
	className?: string
}

export const UsersCardForm: React.FC<Props> = ({
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
			<div className='mx-2 lg:mx-0 grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4'>
				{data.map((item, index) => (
					<UsersCardItem
						key={index}
						userId={item.id}
						avatarUrl={getMediaUrl(item.avatar, '/logo.png')}
						name={item.name}
						description={item.description}
						url={`/u/${item.id}`}
					/>
				))}
			</div>
		</div>
	)
}

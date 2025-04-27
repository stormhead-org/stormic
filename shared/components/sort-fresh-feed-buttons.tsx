'use client'

import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl'
import { Button } from './ui/button'

interface Props {
	className?: string
}

export const SortFeedButtons: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()
	
	const feedButtons = [
		{
			id: 1,
			text: formatMessage({ id: 'sortFeedButtons.day' }),
			path: '/?day'
		},
		{
			id: 2,
			text: formatMessage({ id: 'sortFeedButtons.weekly' }),
			path: '/?weekly'
		},
		{
			id: 3,
			text: formatMessage({ id: 'sortFeedButtons.month' }),
			path: '/?month'
		},
		{
			id: 4,
			text: formatMessage({ id: 'sortFeedButtons.year' }),
			path: '/?year'
		}
	]
	
	return (
		<div className={cn('flex flex-1 bg-secondary rounded-md', className)}>
			{feedButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					className={cn(
						'h-12 flex-1 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white',
						`${pathname === item.path ? 'bg-blue-800 hover:bg-blue-800 text-white' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}

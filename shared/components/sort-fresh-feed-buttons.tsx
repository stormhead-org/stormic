'use client'

import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'
import { Button } from './ui/button'

interface Props {
	className?: string
}

export const SortFreshFeedButtons: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const feedButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'sortFeedButtons.day' }),
			text: 'Все',
			path: '/new',
			disabled: false
		},
		// {
		// 	id: 2,
		// 	// text: formatMessage({ id: 'sortFeedButtons.weekly' }),
		// 	text: 'Новое',
		// 	path: '#',
		// 	disabled: true
		// },
		{
			id: 2,
			// text: formatMessage({ id: 'sortFeedButtons.month' }),
			text: '5+',
			path: '#',
			disabled: true
		},
		{
			id: 3,
			// text: formatMessage({ id: 'sortFeedButtons.year' }),
			text: '10+',
			path: '#',
			disabled: true
		}
	]
	return (
		<div className={cn('flex gap-2 justify-start', className)}>
			{feedButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'text-base font-bold bg-transparent hover:bg-secondary text-primary rounded-xl',
						pathname === item.path && 'text-theme bg-secondary'
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}

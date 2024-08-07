'use client'

import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const feedButtons = [
	{ id: 1, text: 'День', path: '/?day' },
	{ id: 2, text: 'Неделя', path: '/?weekly' },
	{ id: 3, text: 'Месяц', path: '/?month' },
	{ id: 4, text: 'Год', path: '/?year' },
]

interface Props {
	className?: string
}

export const SortFeedButtons: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const router = useRouter()

	return (
		<div className={cn('flex bg-secondary rounded-md', className)}>
			{feedButtons.map(item => (
				<Button
					key={item.id}
					variant='secondary'
					type='button'
					className={cn(
						'h-12 w-full text-sm font-bold cursor-pointer hover:bg-blue-600',
						`${pathname === item.path ? 'bg-blue-600' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}

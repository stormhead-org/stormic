'use client'

import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const feedButtons = [
	{ id: 1, text: 'День', path: '/?day' },
	{ id: 2, text: 'Неделя', path: '/?weekly' },
	{ id: 3, text: 'Месяц', path: '/?month' },
	{ id: 4, text: 'Год', path: '/?year' }
]

interface Props {
	className?: string
}

export const SortFeedButtons: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const router = useRouter()
	
	return (
		<div className={cn('flex flex-1 bg-secondary rounded-md', className)}>
			{feedButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					className={cn(
						'h-12 flex-1 text-sm font-bold cursor-pointer bg-secondary hover:bg-blue-700 hover:text-white',
						`${pathname === item.path ? 'bg-blue-800 text-white hover:bg-blue-800' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}

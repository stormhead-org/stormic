'use client'

import { Container } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Component, Lightbulb, Newspaper, UsersRound } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
	className?: string
}

export const MobileBottomNavBar: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const pathname = usePathname()

	const HeaderButtonsArray = [
		{ id: 1, icon: <Newspaper size={24} />, path: '/', disabled: false },
		{
			id: 2,
			icon: <Component size={24} />,
			path: '/communities',
			disabled: false
		},
		{
			id: 3,
			icon: <UsersRound size={24} />,
			path: '/users',
			disabled: false
		},
		// { id: 4, icon: <LibraryBig size={24} />, path: '/wiki', disabled: true },
		{ id: 4, icon: <Lightbulb size={24} />, path: '/about', disabled: false }
	]

	return (
		<div
			className={cn('bg-background pb-2', className)}
		>
			<Container>
				<div className='flex justify-evenly items-center border-t border-blue-700 py-1 mx-2 bg-secondary rounded-md'>
					{HeaderButtonsArray.map(item => (
						<Button
							key={item.id}
							variant='blue'
							type='button'
							disabled={item.disabled}
							className={cn(
								'w-10 h-10 bg-transparent hover:bg-blue-700 text-primary hover:text-white rounded-full p-0',
								`${pathname === item.path ? 'bg-blue-800 hover:bg-blue-800 text-white' : ''}`
							)}
							onClick={() => router.push(item.path)}
						>
							{item.icon}
						</Button>
					))}
				</div>
			</Container>
		</div>
	)
}

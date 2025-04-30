'use client'

import { Container } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Bell, House, Search, Send, UserRound } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
	className?: string
}

export const MobileBottomNavBar: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const pathname = usePathname()

	const MobileBottomNavBarArray = [
		{ id: 1, icon: <House size={24} />, path: '/', disabled: false },
		{
			id: 2,
			icon: <Search size={24} />,
			path: '/explore',
			disabled: false
		},
		{
			id: 3,
			icon: <Send size={24} />,
			path: '#',
			disabled: true
		},
		// { id: 4, icon: <LibraryBig size={24} />, path: '/wiki', disabled: true },
		{ id: 4, icon: <Bell size={24} />, path: '#', disabled: true },
		{ id: 5, icon: <UserRound size={24} />, path: '/account', disabled: false }
	]

	return (
		<div className={cn('bg-background pb-2', className)}>
			<Container>
				<div className='flex justify-evenly items-center border-t border-primary/5 py-1 mx-2 bg-secondary rounded-xl'>
					{MobileBottomNavBarArray.map(item => (
						<Button
							key={item.id}
							variant='blue'
							type='button'
							disabled={item.disabled}
							className={cn(
								'w-10 h-10 bg-transparent hover:bg-primary/5 text-foreground rounded-xl p-0',
								`${pathname === item.path ? 'bg-primary/5 text-theme hover:text-theme dark:hover:text-theme' : ''}`
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

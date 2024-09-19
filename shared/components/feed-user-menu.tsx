'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { BookmarkCheck, CheckCheck, Dot, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const FeedUserMenu: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()
	
	const userMenu = [
		{
			id: 1,
			text: formatMessage({ id: 'feedUserMenu.popular' }),
			icon: <Flame size={22} />,
			path: '/',
			disabled: true
		},
		{
			id: 2,
			text: formatMessage({ id: 'feedUserMenu.hot' }),
			icon: <Zap size={22} />,
			path: '/new',
			disabled: false
		},
		{
			id: 3,
			text: formatMessage({ id: 'feedUserMenu.myFeed' }),
			icon: <CheckCheck size={22} />,
			path: '/my',
			disabled: false
		},
		{
			id: 4,
			text: formatMessage({ id: 'feedUserMenu.bookmarks' }),
			icon: <BookmarkCheck size={22} />,
			path: '/bookmarks',
			disabled: false
		}
	]
	
	return (
		<div className={cn('', className)}>
			{userMenu.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'flex gap-2 justify-start w-full mb-1 h-12 text-lg font-bold bg-transparent hover:bg-blue-700 text-primary hover:text-white',
						`${pathname === item.path ? 'bg-blue-800 hover:bg-blue-800 text-white' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.icon}
					{item.text}
				</Button>
			))}
		</div>
	)
}

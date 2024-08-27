'use client'

import { cn } from '@/shared/lib/utils'
import { BookmarkCheck, CheckCheck, Dot, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const userMenu = [
	{ id: 1, text: 'Популярное', icon: <Zap size={22} />, path: '/' },
	{
		id: 2,
		text: 'Свежее',
		icon: <Flame size={22} />,
		path: '/new',
		dot: <Dot size={32} className='text-blue-400' />
	},
	{ id: 3, text: 'Моя лента', icon: <CheckCheck size={22} />, path: '/my' },
	{
		id: 4,
		text: 'Закладки',
		icon: <BookmarkCheck size={22} />,
		path: '/bookmarks'
	}
]

interface Props {
	className?: string
}

export const FeedUserMenu: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const router = useRouter()
	
	return (
		<div className={cn('', className)}>
			{userMenu.map(item => (
				<li
					key={item.id}
					className={cn(
						'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-700 hover:text-white cursor-pointer mb-1',
						`${pathname === item.path ? 'bg-blue-800 text-white hover:bg-blue-800' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					<div className='flex items-center gap-2 ml-2'>
						{item.icon}
						<Link href={item.path} className='text-lg font-bold'>
							{item.text}
						</Link>
					</div>
					{item.dot}
				</li>
			))}
		</div>
	)
}

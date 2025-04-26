'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { BookmarkCheck, CheckCheck, Flame, Zap } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const FeedUserMenu: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const userMenu = [
		{
			id: 1,
			text: 'Популярное',
			icon: (isActive: boolean) => (
				<Flame
					size={22}
					className={cn('text-primary', isActive && 'text-blue-700')}
				/>
			),
			path: '/',
			disabled: true
		},
		{
			id: 2,
			text: 'Свежее',
			icon: (isActive: boolean) => (
				<Zap
					size={22}
					className={cn('text-primary', isActive && 'text-blue-700')}
				/>
			),
			path: '/new',
			disabled: false
		},
		{
			id: 3,
			text: 'Моя Лента',
			icon: (isActive: boolean) => (
				<CheckCheck
					size={22}
					className={cn('text-primary', isActive && 'text-blue-700')}
				/>
			),
			path: '/my',
			disabled: false
		},
		{
			id: 4,
			text: 'Закладки',
			icon: (isActive: boolean) => (
				<BookmarkCheck
					size={22}
					className={cn('text-primary', isActive && 'text-blue-700')}
				/>
			),
			path: '/bookmarks',
			disabled: false
		}
	]

	return (
		<div className={cn('', className)}>
			{userMenu.map(item => {
				const isActive = pathname === item.path
				return (
					<Button
						key={item.id}
						variant='blue'
						type='button'
						disabled={item.disabled}
						className={cn(
							'flex gap-2 justify-start w-full mb-1 h-12 text-lg font-bold bg-transparent hover:bg-secondary text-primary rounded-xl',
							isActive && 'bg-secondary hover:bg-secondary'
						)}
						onClick={() => router.push(item.path)}
					>
						{typeof item.icon === 'function' ? item.icon(isActive) : item.icon}
						{item.text}
					</Button>
				)
			})}
		</div>
	)
}
